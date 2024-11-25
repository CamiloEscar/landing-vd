'use client'

import { useState, useCallback } from 'react'
import { AlertTriangle, ArrowLeft, ArrowRight, MessageCircle, Search } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { complaintTypes } from './data/complaints'
import { ComplaintType, Problem, Solution } from './types/complaints'

export default function Reclamos() {
  const [step, setStep] = useState(0)
  const [selectedType, setSelectedType] = useState<ComplaintType | null>(null)
  const [selectedProblem, setSelectedProblem] = useState<Problem | null>(null)
  const [selectedSolution, setSelectedSolution] = useState<Solution | null>(null)
  const [searchQuery, setSearchQuery] = useState('')

  const handleSearch = useCallback((query: string) => {
    setSearchQuery(query)
    if (query.length > 2) {
      const results = complaintTypes.flatMap(type => 
        type.problems.filter(problem => 
          problem.label.toLowerCase().includes(query.toLowerCase()) ||
          problem.description.toLowerCase().includes(query.toLowerCase())
        ).map(problem => ({ type, problem }))
      )
      if (results.length > 0) {
        setSelectedType(results[0].type)
        setSelectedProblem(results[0].problem)
        setStep(2)
      }
    }
  }, [])

  const handleWhatsAppRedirect = useCallback(() => {
    if (!selectedType || !selectedProblem || !selectedSolution) return

    const phoneNumber = '3442457060'
    const message = encodeURIComponent(`Hola, necesito ayuda con ${selectedType.name}. 
Problema: ${selectedProblem.label}
Descripción: ${selectedProblem.description}
He intentado la siguiente solución:
${selectedSolution.title}
${selectedSolution.steps.map((step, index) => `${index + 1}. ${step}`).join('\n')}

El problema persiste.`)
    
    window.open(`https://wa.me/${phoneNumber}?text=${message}`, '_blank')
  }, [selectedType, selectedProblem, selectedSolution])

  const renderStep = () => {
    switch(step) {
      case 0:
        return (
          <div className="space-y-4">
            <div className="relative">
              <Input
                type="text"
                placeholder="Busca tu problema aquí..."
                value={searchQuery}
                onChange={(e) => handleSearch(e.target.value)}
                className="pl-10"
              />
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {complaintTypes.map((type) => (
                <Button
                  key={type.id}
                  variant="outline"
                  className="h-auto py-4 flex flex-col items-center"
                  onClick={() => {
                    setSelectedType(type)
                    setStep(1)
                  }}
                >
                  <type.icon className="w-12 h-12 mb-2" />
                  <span className="text-lg font-semibold text-center">{type.name}</span>
                </Button>
              ))}
            </div>
          </div>
        )
      case 1:
        return (
          <div className="space-y-4">
            <h2 className="text-xl font-bold">{selectedType?.name}</h2>
            <RadioGroup onValueChange={(value) => {
              const problem = selectedType?.problems.find(p => p.id === value)
              if (problem) {
                setSelectedProblem(problem)
                setStep(2)
              }
            }}>
              {selectedType?.problems.map((problem) => (
                <div key={problem.id} className="flex items-center space-x-2">
                  <RadioGroupItem value={problem.id} id={problem.id} />
                  <Label htmlFor={problem.id} className="flex-grow cursor-pointer">
                    <span className="font-medium">{problem.label}</span>
                    <p className="text-sm text-gray-500">{problem.description}</p>
                  </Label>
                </div>
              ))}
            </RadioGroup>
          </div>
        )
      case 2:
        return (
          <div className="space-y-6">
            <h2 className="text-xl font-bold">{selectedProblem?.label}</h2>
            <p className="text-gray-600">{selectedProblem?.description}</p>
            <div className="space-y-4">
              {selectedProblem?.solutions.map((solution) => (
                <Card key={solution.id}>
                  <CardHeader>
                    <CardTitle>{solution.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ol className="list-decimal list-inside space-y-2">
                      {solution.steps.map((step, stepIndex) => (
                        <li key={stepIndex}>{step}</li>
                      ))}
                    </ol>
                    <Button 
                      className="mt-4"
                      onClick={() => {
                        setSelectedSolution(solution)
                        setStep(3)
                      }}
                    >
                      Intentar esta solución
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )
      case 3:
        return (
          <div className="space-y-6">
            <h2 className="text-xl font-bold">¿Resolvió el problema?</h2>
            <div className="space-y-4">
              <Button onClick={() => setStep(0)} className="w-full">Sí, problema resuelto</Button>
              <Button onClick={() => setStep(2)} className="w-full">No, intentar otra solución</Button>
              <Button onClick={handleWhatsAppRedirect} className="w-full">
                <MessageCircle className="mr-2 h-4 w-4" />
                Necesito ayuda adicional
              </Button>
            </div>
          </div>
        )
      default:
        return null
    }
  }

  return (
    <div className="min-h-screen bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <Card>
          <CardHeader>
            <CardTitle className="text-3xl font-bold flex items-center">
              <AlertTriangle className="mr-2 text-yellow-500" />
              Sistema de Reclamos
            </CardTitle>
            <CardDescription>
              Resuelve tus problemas de forma rápida y sencilla
            </CardDescription>
          </CardHeader>
          <CardContent>
            {renderStep()}
            <div className="flex justify-between mt-8">
              {step > 0 && (
                <Button onClick={() => setStep(step - 1)} variant="outline">
                  <ArrowLeft className="mr-2 h-4 w-4" /> Anterior
                </Button>
              )}
              {step < 3 && step > 0 && (
                <Button onClick={() => setStep(step + 1)} disabled={!selectedType || (step === 1 && !selectedProblem)}>
                  Siguiente <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

