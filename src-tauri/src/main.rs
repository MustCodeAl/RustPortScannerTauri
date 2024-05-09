// Prevents additional console window on Windows in release, DO NOT REMOVE!!
#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]

use std::net::TcpStream;
use std::thread;
// Learn more about Tauri commands at https://tauri.app/v1/guides/features/command
#[tauri::command]
fn greet(name: &str) -> String {
    format!("Hello, {}! You've been greeted from Rust!", name)
}

#[tauri::command]
fn scan_port(ip: String, port: u16) -> bool {
  let address = format!("{}:{}", ip, port);
  match TcpStream::connect(address) {
    Ok(_) => true,
    Err(_) => false,
  }
}

fn main() {
    tauri::Builder::default()
        .invoke_handler(tauri::generate_handler![scan_port])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
