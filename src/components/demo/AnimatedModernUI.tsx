import { useEffect, useState } from 'react'
import { useDemoStore } from '~/stores/demoStore'
import { Card } from '~/components/ui/card'
import { Input } from '~/components/ui/input'
import { Label } from '~/components/ui/label'
import { Badge } from '~/components/ui/badge'
import { Button } from '~/components/ui/button'
import { Separator } from '~/components/ui/separator'
import { 
  Building2, 
  Fuel, 
  Calculator, 
  Receipt, 
  CheckCircle,
  TrendingUp
} from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'

export function AnimatedModernUI() {
  const formData = useDemoStore((state) => state.formData)
  const currentStep = useDemoStore((state) => state.currentStep)
  const [showDropdown, setShowDropdown] = useState(false)
  const [typingValue, setTypingValue] = useState('')

  // Customer suggestions for demo
  const customerSuggestions = [
    { id: 'CUST001', name: 'ACME Oil Company' },
    { id: 'CUST002', name: 'Global Fuel Inc' },
    { id: 'CUST003', name: 'Metro Gas Station' },
  ]

  // Simulate typing animation for customer input
  useEffect(() => {
    if (currentStep === 1 && formData.customerId) {
      setShowDropdown(true)
      setTypingValue('')
      
      let index = 0
      const targetValue = formData.customerId
      
      const typeInterval = setInterval(() => {
        if (index < targetValue.length) {
          setTypingValue(targetValue.slice(0, index + 1))
          index++
        } else {
          clearInterval(typeInterval)
          // Show dropdown briefly then hide it
          setTimeout(() => setShowDropdown(false), 2000)
        }
      }, 100)

      return () => clearInterval(typeInterval)
    } else {
      setTypingValue(formData.customerId)
      setShowDropdown(false)
    }
  }, [currentStep, formData.customerId])

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(value)
  }

  return (
    <div className="relative h-full">
      <div className="h-full overflow-y-auto space-y-2 sm:space-y-4 pr-2">
        {/* Header */}
        <motion.div 
          className="flex items-center gap-2 pb-2"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          <Receipt className="h-5 w-5 text-primary" />
          <h3 className="font-semibold">Modern Order Form</h3>
          <Badge variant="outline" className="ml-auto">
            Real-time
          </Badge>
        </motion.div>

        {/* Customer Section */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.3, delay: 0.1 }}
        >
          <Card className="p-4 relative">
            <div className="flex items-center gap-2 mb-3">
              <Building2 className="h-4 w-4 text-muted-foreground" />
              <Label className="text-sm font-medium">Customer Information</Label>
            </div>
            <div className="grid gap-3">
              <div className="relative">
                <Label htmlFor="customerId" className="text-xs text-muted-foreground">
                  Customer ID
                </Label>
                <Input
                  id="customerId"
                  value={currentStep === 1 ? typingValue : formData.customerId}
                  placeholder="Type to search customers..."
                  className="mt-1"
                  readOnly
                />
                
                {/* Animated dropdown suggestions */}
                <AnimatePresence>
                  {showDropdown && (
                    <motion.div
                      initial={{ opacity: 0, y: -10, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: -10, scale: 0.95 }}
                      transition={{ duration: 0.2 }}
                      className="absolute top-full left-0 right-0 z-20 mt-1"
                    >
                      <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-md shadow-lg">
                        {customerSuggestions.map((customer, index) => (
                          <motion.div
                            key={customer.id}
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.2, delay: index * 0.1 }}
                            className="p-2 hover:bg-gray-50 dark:hover:bg-gray-700 cursor-pointer border-b last:border-b-0"
                          >
                            <div className="flex items-center gap-2">
                              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                              <div>
                                <div className="text-sm font-medium">{customer.id}</div>
                                <div className="text-xs text-muted-foreground">{customer.name}</div>
                              </div>
                            </div>
                          </motion.div>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
              
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: formData.customerName ? 1 : 0 }}
                transition={{ duration: 0.3 }}
              >
                <Label htmlFor="customerName" className="text-xs text-muted-foreground">
                  Customer Name
                </Label>
                <Input
                  id="customerName"
                  value={formData.customerName}
                  placeholder="Customer name will appear here"
                  className="mt-1"
                  readOnly
                />
              </motion.div>
              
              <AnimatePresence>
                {formData.customerName && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.8 }}
                    className="flex items-center gap-2 text-sm text-green-600"
                  >
                    <CheckCircle className="h-4 w-4" />
                    <span>Customer verified automatically</span>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
            
          </Card>
        </motion.div>

        {/* Product Section */}
        <AnimatePresence>
          {currentStep >= 2 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
            >
              <Card className="p-4">
                <div className="flex items-center gap-2 mb-3">
                  <Fuel className="h-4 w-4 text-muted-foreground" />
                  <Label className="text-sm font-medium">Product Information</Label>
                </div>
                <div className="grid gap-3">
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.3, delay: 0.2 }}
                  >
                    <Label htmlFor="rackPrice" className="text-xs text-muted-foreground">
                      Rack Price (per gallon)
                    </Label>
                    <Input
                      id="rackPrice"
                      value={formData.rackPrice ? formatCurrency(formData.rackPrice) : ''}
                      placeholder="Product price will appear here"
                      className="mt-1"
                      readOnly
                    />
                  </motion.div>
                  
                  <AnimatePresence>
                    {formData.rackPrice > 0 && (
                      <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -20 }}
                        className="flex items-center gap-2 text-sm text-blue-600"
                      >
                        <TrendingUp className="h-4 w-4" />
                        <span>Product: Diesel Fuel - Live pricing updated</span>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </Card>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Calculations Section */}
        <AnimatePresence>
          {currentStep >= 3 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
            >
              <Card className="p-4">
                <div className="flex items-center gap-2 mb-3">
                  <Calculator className="h-4 w-4 text-muted-foreground" />
                  <Label className="text-sm font-medium">Live Calculations</Label>
                </div>
                <div className="space-y-3">
                  <motion.div
                    className="flex justify-between"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.3, delay: 0.1 }}
                  >
                    <span className="text-sm text-muted-foreground">Subtotal</span>
                    <span className="text-sm font-medium">
                      {formData.rackPrice > 0 ? formatCurrency(formData.rackPrice * 1000) : '$0.00'}
                    </span>
                  </motion.div>
                  
                  <AnimatePresence>
                    {formData.tax > 0 && (
                      <motion.div
                        className="flex justify-between"
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.8 }}
                      >
                        <span className="text-sm text-muted-foreground">Tax (TX)</span>
                        <span className="text-sm font-medium">
                          {formatCurrency(formData.tax)}
                        </span>
                      </motion.div>
                    )}
                  </AnimatePresence>
                  
                  <Separator />
                  
                  <motion.div
                    className="flex justify-between"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.3, delay: 0.2 }}
                  >
                    <span className="font-medium">Total</span>
                    <motion.span
                      className="font-bold text-lg"
                      key={formData.total}
                      initial={{ scale: 1.2, color: '#22c55e' }}
                      animate={{ scale: 1, color: 'inherit' }}
                      transition={{ duration: 0.3 }}
                    >
                      {formData.total > 0 ? formatCurrency(formData.total) : '$0.00'}
                    </motion.span>
                  </motion.div>
                </div>
              </Card>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Action Buttons */}
        <AnimatePresence>
          {currentStep >= 6 && (
            <motion.div
              className="flex gap-2 pt-2"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
            >
              <Button 
                className="flex-1" 
                disabled={currentStep < 6}
                variant={currentStep >= 6 ? "default" : "outline"}
              >
                Save Invoice
              </Button>
              <Button 
                className="flex-1" 
                disabled={currentStep < 7}
                variant={currentStep >= 7 ? "default" : "outline"}
              >
                Generate BOL
              </Button>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Status Messages */}
        <AnimatePresence>
          {currentStep >= 6 && (
            <motion.div
              className="flex items-center gap-2 p-3 bg-green-50 dark:bg-green-900/20 rounded-md"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3 }}
            >
              <CheckCircle className="h-4 w-4 text-green-600" />
              <span className="text-sm text-green-700 dark:text-green-400">
                Invoice #INV-2024-001 saved successfully
              </span>
            </motion.div>
          )}
        </AnimatePresence>

        <AnimatePresence>
          {currentStep >= 7 && (
            <motion.div
              className="flex items-center gap-2 p-3 bg-blue-50 dark:bg-blue-900/20 rounded-md"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3, delay: 0.2 }}
            >
              <CheckCircle className="h-4 w-4 text-blue-600" />
              <span className="text-sm text-blue-700 dark:text-blue-400">
                BOL-INV-2024-001.pdf generated
              </span>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}