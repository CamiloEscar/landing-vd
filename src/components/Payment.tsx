"use client"

import { useState } from 'react'
import { CreditCard, User, DollarSign, FileText, Loader2, CheckCircle, XCircle } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"

interface Invoice {
  id: string
  amount: number
  dueDate: string
}

export default function Payment() {
  const [accountNumber, setAccountNumber] = useState('')
  const [selectedInvoice, setSelectedInvoice] = useState<Invoice | null>(null)
  const [invoices, setInvoices] = useState<Invoice[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [isProcessing, setIsProcessing] = useState(false)
  const [status, setStatus] = useState<'success' | 'error' | null>(null)

  const fetchInvoices = async () => {
    setIsLoading(true)
    setError(null)
    try {
      // Replace this with your actual API call
      const response = await fetch(`https://api.megasoft.com/invoices?accountNumber=${accountNumber}`)
      if (!response.ok) {
        throw new Error('Failed to fetch invoices')
      }
      const data = await response.json()
      setInvoices(data)
      setSelectedInvoice(null)
    } catch (err) {
      setError('Error fetching invoices. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!selectedInvoice) {
      setError('Please select an invoice to pay')
      return
    }
    setIsProcessing(true)
    setStatus(null)
    setError(null)

    try {
      // Replace this with your actual payment processing API call
      const response = await fetch('https://api.megasoft.com/pay', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          accountNumber,
          invoiceId: selectedInvoice.id,
          amount: selectedInvoice.amount
        })
      })
      if (!response.ok) {
        throw new Error('Payment failed')
      }
      setStatus('success')
    } catch (err) {
      setStatus('error')
      setError('Payment failed. Please try again.')
    } finally {
      setIsProcessing(false)
    }
  }

  return (
    <div id="payment" className="py-24 bg-gradient-to-b from-gray-50 to-white min-h-screen">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center"
        >
          <CreditCard className="mx-auto h-16 w-16 text-primary" />
          <h2 className="mt-4 text-4xl font-extrabold text-gray-900 sm:text-5xl">
            Pago de Factura
          </h2>
          <p className="mt-4 text-xl text-gray-500">
            Realiza el pago de tu factura de manera rápida y segura
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <Card className="mt-16 shadow-lg">
            <CardHeader>
              <CardTitle className="text-2xl">Buscar Facturas</CardTitle>
              <CardDescription>Ingresa tu número de cuenta para ver tus facturas pendientes</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div className="flex items-center space-x-4">
                  <div className="flex-grow">
                    <Label htmlFor="account" className="text-sm font-medium text-gray-700">Número de Cuenta</Label>
                    <div className="relative mt-1">
                      <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                      <Input
                        id="account"
                        type="text"
                        value={accountNumber}
                        onChange={(e) => setAccountNumber(e.target.value)}
                        className="pl-10"
                        placeholder="Ej: 123456789"
                      />
                    </div>
                  </div>
                  <Button 
                    onClick={fetchInvoices} 
                    disabled={isLoading || !accountNumber}
                    className="mt-6"
                  >
                    {isLoading ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Buscando...
                      </>
                    ) : (
                      'Buscar Facturas'
                    )}
                  </Button>
                </div>

                <AnimatePresence>
                  {error && (
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      transition={{ duration: 0.3 }}
                    >
                      <Alert variant="destructive">
                        <AlertTitle>Error</AlertTitle>
                        <AlertDescription>{error}</AlertDescription>
                      </Alert>
                    </motion.div>
                  )}
                </AnimatePresence>

                <AnimatePresence>
                  {invoices.length > 0 && (
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 20 }}
                      transition={{ duration: 0.3 }}
                    >
                      <Label htmlFor="invoice-select" className="text-sm font-medium text-gray-700">Seleccionar Factura</Label>
                      <Select onValueChange={(value) => setSelectedInvoice(invoices.find(inv => inv.id === value) || null)}>
                        <SelectTrigger id="invoice-select" className="mt-1">
                          <SelectValue placeholder="Selecciona una factura" />
                        </SelectTrigger>
                        <SelectContent>
                          {invoices.map((invoice) => (
                            <SelectItem key={invoice.id} value={invoice.id}>
                              ${invoice.amount.toFixed(2)} - Vence: {invoice.dueDate}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </motion.div>
                  )}
                </AnimatePresence>

                <AnimatePresence>
                  {selectedInvoice && (
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 20 }}
                      transition={{ duration: 0.3 }}
                      className="bg-gray-100 p-6 rounded-lg shadow-inner"
                    >
                      <h3 className="font-semibold text-lg mb-4">Detalles de la Factura</h3>
                      <div className="flex justify-between items-center">
                        <div>
                          <p className="text-sm text-gray-600">Monto a Pagar</p>
                          <p className="text-2xl font-bold text-primary">${selectedInvoice.amount.toFixed(2)}</p>
                        </div>
                        <div>
                          <p className="text-sm text-gray-600">Fecha de Vencimiento</p>
                          <p className="text-lg font-semibold">{selectedInvoice.dueDate}</p>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </CardContent>
            <CardFooter>
              <form onSubmit={handleSubmit} className="w-full">
                <Button
                  type="submit"
                  className="w-full"
                  disabled={isProcessing || !selectedInvoice}
                >
                  {isProcessing ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Procesando...
                    </>
                  ) : (
                    <>
                      <DollarSign className="mr-2 h-4 w-4" />
                      Realizar Pago
                    </>
                  )}
                </Button>
              </form>
            </CardFooter>
          </Card>
        </motion.div>

        <AnimatePresence>
          {status && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              transition={{ duration: 0.3 }}
              className="mt-6"
            >
              <Alert variant={status === 'success' ? 'default' : 'destructive'}>
                <div className="flex items-center">
                  {status === 'success' ? (
                    <CheckCircle className="h-5 w-5 text-green-400 mr-2" />
                  ) : (
                    <XCircle className="h-5 w-5 text-red-400 mr-2" />
                  )}
                  <AlertTitle>
                    {status === 'success' 
                      ? '¡Pago realizado con éxito!'
                      : 'Error al procesar el pago'}
                  </AlertTitle>
                </div>
                <AlertDescription>
                  {status === 'success' 
                    ? 'Tu pago ha sido procesado correctamente.'
                    : 'Por favor, verifica tus datos e intenta nuevamente.'}
                </AlertDescription>
              </Alert>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}