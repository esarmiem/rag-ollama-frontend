import axios from "axios"

const API_BASE_URL = "http://127.0.0.1:8080"

const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 60000, // 1 minuto de timeout
})

// Instancia específica para ask_pdf con timeout mayor
const askPdfApi = axios.create({
  baseURL: API_BASE_URL,
  timeout: 120000, // 2 minutos de timeout
})

interface ListPdfsResponse {
  file_count: number
  files: Array<{
    name: string
    size_bytes: number
    size_mb: number
    last_modified: number
    last_modified_human: string
  }>
  status: string
}

// Chat with model
export const chatWithModel = async (query: string): Promise<string> => {
  try {
    const response = await api.post("/model", { query })
    const fullResponse = response.data.respuesta || "Sin respuesta"
    
    // Remove both opening and closing think tags and their content
    const thinkStartIndex = fullResponse.indexOf("<think>")
    const thinkEndIndex = fullResponse.indexOf("</think>")
    if (thinkStartIndex !== -1 && thinkEndIndex !== -1) {
      return fullResponse.slice(thinkEndIndex + 8).trim()
    }
    
    return fullResponse
  } catch (error) {
    console.error("Chat API error:", error)
    throw new Error("Error al comunicarse con el modelo")
  }
}

// Upload PDF
export const uploadPdf = async (file: File): Promise<any> => {
  try {
    const formData = new FormData()
    formData.append("file", file)

    const response = await api.post("/pdf", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    })

    return response.data
  } catch (error) {
    console.error("Upload PDF error:", error)
    throw new Error("Error al subir el PDF")
  }
}

// Ask PDF
export const askPdf = async (query: string): Promise<string> => {
  try {
    const response = await askPdfApi.post("/ask_pdf", { query })
    const fullResponse = response.data.respuesta || "Sin respuesta"
    
    // Remove both opening and closing think tags and their content
    const thinkStartIndex = fullResponse.indexOf("<think>")
    const thinkEndIndex = fullResponse.indexOf("</think>")
    if (thinkStartIndex !== -1 && thinkEndIndex !== -1) {
      return fullResponse.slice(thinkEndIndex + 8).trim()
    }
    
    return fullResponse
  } catch (error) {
    console.error("Ask PDF error:", error)
    throw new Error("Error al consultar el PDF")
  }
}

// Ask PDF with OpenAI
export const askPdfOpenAI = async (query: string): Promise<string> => {
  try {
    const response = await askPdfApi.post("/ask_pdf_openai", { query })
    console.log("Backend response:", response.data)
    const fullResponse = response.data.respuesta || "Sin respuesta"
    
    // Remove both opening and closing think tags and their content
    const thinkStartIndex = fullResponse.indexOf("<think>")
    const thinkEndIndex = fullResponse.indexOf("</think>")
    if (thinkStartIndex !== -1 && thinkEndIndex !== -1) {
      return fullResponse.slice(thinkEndIndex + 8).trim()
    }
    
    return fullResponse
  } catch (error) {
    console.error("Ask PDF OpenAI error:", error)
    throw new Error("Error al consultar el PDF con OpenAI")
  }
}

// List PDFs
export const listPdfs = async (): Promise<ListPdfsResponse> => {
  try {
    const response = await api.get("/list_pdfs")
    return response.data
  } catch (error) {
    console.error("List PDFs error:", error)
    throw new Error("Error al listar los PDFs")
  }
}

// Reset database
export const resetDatabase = async (): Promise<any> => {
  try {
    const response = await api.post("/reset_db")
    return response.data
  } catch (error) {
    console.error("Reset DB error:", error)
    throw new Error("Error al resetear la base de datos")
  }
}

// Check DB status
export const checkDbStatus = async (): Promise<any> => {
  try {
    const response = await api.get("/db_status")
    return response.data
  } catch (error) {
    console.error("DB Status error:", error)
    throw new Error("Error al verificar el estado de la base de datos")
  }
}
