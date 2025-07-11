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
  Package,
  CheckCircle,
  AlertCircle,
  TrendingUp
} from 'lucide-react'

export function ModernUIPreview() {
  const { formData, currentStep } = useDemoStore((state) => ({
    formData: state.formData,
    currentStep: state.currentStep,
  }))

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(value)
  }

  const formatNumber = (value: number) => {
    return new Intl.NumberFormat('en-US').format(value)
  }

  return (
    <div className="h-full overflow-y-auto space-y-4">
      <div className="space-y-4">
        {/* Header */}
        <div className="flex items-center gap-2 pb-2">
          <Receipt className="h-5 w-5 text-primary" />
          <h3 className="font-semibold">Modern Order Form</h3>
          <Badge variant="outline" className="ml-auto">
            Real-time
          </Badge>
        </div>

        {/* Customer Section */}
        <Card className="p-4">
          <div className="flex items-center gap-2 mb-3">
            <Building2 className="h-4 w-4 text-muted-foreground" />
            <Label className="text-sm font-medium">Customer Information</Label>
          </div>
          <div className="grid gap-3">
            <div>
              <Label htmlFor="customerId" className="text-xs text-muted-foreground">
                Customer ID
              </Label>
              <Input
                id="customerId"
                value={formData.customerId}
                placeholder="Enter customer ID"
                className="mt-1"
                readOnly
              />
            </div>
            <div>
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
            </div>
            {formData.customerName && (
              <div className="flex items-center gap-2 text-sm text-green-600">
                <CheckCircle className="h-4 w-4" />
                Customer verified
              </div>
            )}
          </div>
        </Card>

        {/* Product Section */}
        <Card className="p-4">
          <div className="flex items-center gap-2 mb-3">
            <Fuel className="h-4 w-4 text-muted-foreground" />
            <Label className="text-sm font-medium">Product Information</Label>
          </div>
          <div className="grid gap-3">
            <div>
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
            </div>
            <div>
              <Label htmlFor="gallons" className="text-xs text-muted-foreground">
                Gallons
              </Label>
              <Input
                id="gallons"
                value="1,000"
                placeholder="Enter quantity"
                className="mt-1"
                readOnly
              />
            </div>
            {formData.rackPrice > 0 && (
              <div className="flex items-center gap-2 text-sm text-blue-600">
                <TrendingUp className="h-4 w-4" />
                Product: Diesel Fuel
              </div>
            )}
          </div>
        </Card>

        {/* Calculations Section */}
        <Card className="p-4">
          <div className="flex items-center gap-2 mb-3">
            <Calculator className="h-4 w-4 text-muted-foreground" />
            <Label className="text-sm font-medium">Calculations</Label>
          </div>
          <div className="space-y-3">
            <div className="flex justify-between">
              <span className="text-sm text-muted-foreground">Subtotal</span>
              <span className="text-sm font-medium">
                {formData.rackPrice > 0 ? formatCurrency(formData.rackPrice * 1000) : '$0.00'}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-muted-foreground">Tax (TX)</span>
              <span className="text-sm font-medium">
                {formData.tax > 0 ? formatCurrency(formData.tax) : '$0.00'}
              </span>
            </div>
            <Separator />
            <div className="flex justify-between">
              <span className="font-medium">Total</span>
              <span className="font-bold text-lg">
                {formData.total > 0 ? formatCurrency(formData.total) : '$0.00'}
              </span>
            </div>
          </div>
        </Card>

        {/* Inventory Section */}
        <Card className="p-4">
          <div className="flex items-center gap-2 mb-3">
            <Package className="h-4 w-4 text-muted-foreground" />
            <Label className="text-sm font-medium">Inventory Status</Label>
          </div>
          <div className="space-y-2">
            <div className="flex justify-between">
              <span className="text-sm text-muted-foreground">Tank 1 Remaining</span>
              <span className="text-sm font-medium">
                {formatNumber(formData.inventory)} gal
              </span>
            </div>
            <div className="h-2 bg-muted rounded-full overflow-hidden">
              <div 
                className="h-full bg-primary transition-all duration-300"
                style={{ width: `${(formData.inventory / 10000) * 100}%` }}
              />
            </div>
            <div className="flex items-center gap-2 text-xs">
              {formData.inventory > 5000 ? (
                <CheckCircle className="h-3 w-3 text-green-600" />
              ) : (
                <AlertCircle className="h-3 w-3 text-yellow-600" />
              )}
              <span className="text-muted-foreground">
                {formData.inventory > 5000 ? 'Adequate inventory' : 'Low inventory warning'}
              </span>
            </div>
          </div>
        </Card>

        {/* Action Buttons */}
        <div className="flex gap-2 pt-2">
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
        </div>

        {/* Status Messages */}
        {currentStep >= 6 && (
          <div className="flex items-center gap-2 p-3 bg-green-50 dark:bg-green-900/20 rounded-md">
            <CheckCircle className="h-4 w-4 text-green-600" />
            <span className="text-sm text-green-700 dark:text-green-400">
              Invoice #INV-2024-001 saved successfully
            </span>
          </div>
        )}

        {currentStep >= 7 && (
          <div className="flex items-center gap-2 p-3 bg-blue-50 dark:bg-blue-900/20 rounded-md">
            <CheckCircle className="h-4 w-4 text-blue-600" />
            <span className="text-sm text-blue-700 dark:text-blue-400">
              BOL-INV-2024-001.pdf generated
            </span>
          </div>
        )}
      </div>
    </div>
  )
}