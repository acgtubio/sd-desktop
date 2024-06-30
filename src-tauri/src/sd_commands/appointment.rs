#[tauri::command]
pub async fn add_appointment(t: String) -> String {
    t.to_uppercase()
}
