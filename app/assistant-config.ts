export let assistantId = "asst_xrzigqaxfr694gddwrdzrzxf"; // KOLLA CITATTECKEN set your assistant ID here

if (assistantId === "asst_xrzigqaxfr694gddwrdzrzxf") {
  assistantId = process.env.OPENAI_ASSISTANT_ID;
}
