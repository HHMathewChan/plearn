import { useEffect, useState } from "react";
import { getDataForLearningPreferencesSurvey, createStudentLearningPreferences } from "../Services/StudentLearningPreferenceService";
import type { LearningModes, Topic, ChosenTopic } from "../Types/StudentLearningPreferenceType";
import { useNavigate } from "react-router-dom";
import { getStudentCode } from "../Services/PlatformUserService";

const MAX_TOPICS = 3;

const StudentLearningPreferenceSurvey: React.FC = () => {
  const navigate = useNavigate();

  const [learningModes, setLearningModes] = useState<LearningModes[]>([]);
  const [topics, setTopics] = useState<Topic[]>([]);
  const [selectedLearningModeId, setSelectedLearningModeId] = useState<string>("");
  const [selections, setSelections] = useState<Record<string, { knowledge_proficiency: ChosenTopic["knowledge_proficiency"]; interest_level: ChosenTopic["interest_level"] }>>({});
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  useEffect(() => {
    const load = async () => {
      setLoading(true);
      setError(null);
      try {
        const data = await getDataForLearningPreferencesSurvey();
        // data expected shape: { learningModes: LearningModes[], topics: Topic[] }
        setLearningModes(data.learningModes ?? []);
        setTopics(data.topics ?? []);
      } catch (error) {
        setError("Failed to load survey data.");
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    // discard the promise to fulfill the rule about not using async directly in useEffect
    void load();
  }, []);

  // Count the number of selected topics by checking the number of keys in selections
  const selectedCount = Object.keys(selections).length;

  const handleTopicSelection = (topicId: string, checked: boolean) => {
    setSelections(previous => {
      const next = { ...previous };
      if (checked) {
        // add with default values if not present
        if (!next[topicId]) {
          next[topicId] = { knowledge_proficiency: "novice", interest_level: "medium" };
        }
      } else {
        delete next[topicId];
      }
      return next;
    });
  };

  const setKnowledgeForTopic = (topicId: string, value: ChosenTopic["knowledge_proficiency"]) => {
    setSelections(previous => ({ ...previous, [topicId]: { ...(previous[topicId] ?? { interest_level: "medium" }), knowledge_proficiency: value } }));
  };

  const setInterestForTopic = (topicId: string, value: ChosenTopic["interest_level"]) => {
    setSelections(previous => ({ ...previous, [topicId]: { ...(previous[topicId] ?? { knowledge_proficiency: "novice" }), interest_level: value } }));
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setError(null);
    setSuccessMessage(null);

    if (!selectedLearningModeId) {
      setError("Please select a learning mode.");
      return;
    }
    if (selectedCount === 0) {
      setError("Please select at least one topic (up to three).");
      return;
    }

    const chosenTopics: ChosenTopic[] = Object.entries(selections).map(([topic_id, vals]) => ({
      topic_id,
      interest_level: vals.interest_level,
      knowledge_proficiency: vals.knowledge_proficiency,
    }));

    setSaving(true);
    try {
      const studentCode = await getStudentCode();
      if (!studentCode) {
        setError("Failed to retrieve student code.");
        return;
      }
      const success = await createStudentLearningPreferences(studentCode, selectedLearningModeId, chosenTopics);
      if (success) {
        setSuccessMessage("Preferences saved. Redirecting…");
        // small delay so user can read message
        setTimeout(() => navigate("/student-home"), 800);
      } else {
        setError("Failed to save preferences.");
      }
    } catch (error) {
      console.error(error);
      setError("An error occurred while saving preferences.");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto">
      <h1 className="text-2xl font-semibold mb-4">Learning preferences survey</h1>

      {loading ? (
        <p>Loading survey…</p>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="learningMode" className="block font-medium mb-1">Select a learning mode</label>
            <select
              id="learningMode"
              value={selectedLearningModeId}
              onChange={(event) => setSelectedLearningModeId(event.target.value)}
              className="w-full border px-3 py-2 rounded"
              required
            >
              <option value="">-- Choose a mode --</option>
              {learningModes.map(mode => (
                <option key={mode.id} value={mode.id}>
                  {mode.mode_name}{mode.description ? ` — ${mode.description}` : ""}
                </option>
              ))}
            </select>
          </div>

          <div>
            <p className="font-medium mb-2">Select up to three preferred topics</p>
            <div className="overflow-x-auto border rounded">
              <table className="w-full table-fixed">
                <thead className="bg-gray-100">
                  <tr>
                    <th className="w-1/12 p-2 text-left">Select</th>
                    <th className="w-5/12 p-2 text-left">Topic</th>
                    <th className="w-3/12 p-2 text-left">Knowledge</th>
                    <th className="w-3/12 p-2 text-left">Interest</th>
                  </tr>
                </thead>
                <tbody>
                  {topics.map(topic => {
                    // Determine if this topic is selected by checking if it exists in selections, it returns a boolean with !!
                    const isSelected = !!selections[topic.id];
                    // Disable checkbox if not selected and already reached max
                    const disableCheckbox = (!isSelected) && (selectedCount >= MAX_TOPICS);
                    return (
                      <tr key={topic.id} className="border-t">
                        <td className="p-2">
                          <input
                            type="checkbox"
                            checked={isSelected}
                            onChange={(event) => handleTopicSelection(topic.id, event.target.checked)}
                            disabled={disableCheckbox}
                            aria-label={`Select topic ${topic.name}`}
                          />
                        </td>
                        <td className="p-2">{topic.name}</td>
                        <td className="p-2">
                          <select
                            aria-label="Select a knowledge proficiency"
                            value={selections[topic.id]?.knowledge_proficiency ?? "novice"}
                            onChange={(event) => setKnowledgeForTopic(topic.id, event.target.value as ChosenTopic["knowledge_proficiency"])}
                            disabled={!isSelected}
                            className="w-full border px-2 py-1 rounded"
                          >
                            <option value="novice">Novice</option>
                            <option value="intermediate">Intermediate</option>
                            <option value="proficient">Proficient</option>
                          </select>
                        </td>
                        <td className="p-2">
                          <select
                            aria-label="Select an interest level"
                            value={selections[topic.id]?.interest_level ?? "medium"}
                            onChange={(event) => setInterestForTopic(topic.id, event.target.value as ChosenTopic["interest_level"])}
                            disabled={!isSelected}
                            className="w-full border px-2 py-1 rounded"
                          >
                            <option value="high">High</option>
                            <option value="medium">Medium</option>
                            <option value="low">Low</option>
                          </select>
                        </td>
                      </tr>
                    );
                  })}
                  {topics.length === 0 && (
                    <tr>
                      <td colSpan={4} className="p-4 text-centre">No topics available.</td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
            <p className="text-sm text-gray-600 mt-2">Selected {selectedCount} of {MAX_TOPICS} allowed.</p>
          </div>

          {error && <p className="text-red-600" role="alert">{error}</p>}
          {successMessage && <p className="text-green-600" role="status">{successMessage}</p>}

          <div className="flex items-center space-x-3">
            <button
              type="submit"
              disabled={saving}
              className="px-4 py-2 bg-blue-600 text-white rounded disabled:opacity-60"
            >
              {saving ? "Saving…" : "Save preferences"}
            </button>
            <button
              type="button"
              onClick={() => navigate("/student-home")}
              className="px-4 py-2 border rounded"
            >
              Cancel
            </button>
          </div>
        </form>
      )}
    </div>
  );
};

export default StudentLearningPreferenceSurvey;