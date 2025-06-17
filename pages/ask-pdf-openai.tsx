import { useState } from "react"
import { askPdfOpenAI } from "../lib/api"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Loader2 } from "lucide-react"

export default function AskPdfOpenAI() {
  const [query, setQuery] = useState("")
  const [response, setResponse] = useState("")
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!query.trim()) return

    setIsLoading(true)
    try {
      const result = await askPdfOpenAI(query)
      setResponse(result)
    } catch (error) {
      console.error("Error:", error)
      setResponse("Error al procesar la consulta")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Consultar PDF con OpenAI</h1>
      
      <Card className="mb-4">
        <CardHeader>
          <CardTitle>Realiza tu consulta</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <Textarea
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Escribe tu pregunta sobre el PDF..."
              className="min-h-[100px]"
            />
            <Button type="submit" disabled={isLoading}>
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Procesando...
                </>
              ) : (
                "Consultar"
              )}
            </Button>
          </form>
        </CardContent>
      </Card>

      {response && (
        <Card>
          <CardHeader>
            <CardTitle>Respuesta</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="whitespace-pre-wrap">{response}</div>
          </CardContent>
        </Card>
      )}
    </div>
  )
} 