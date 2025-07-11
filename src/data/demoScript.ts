import type { DemoStep } from '~/stores/demoStore'

export const demoSteps: DemoStep[] = [
  {
    id: 0,
    unibasicCode: `* Initialize Split-Load/BOL Entry
PROMPT "Enter Customer ID: "
INPUT CUSTOMER.ID`,
    csharpCode: `// Initialize modern form with validation
public async Task<IActionResult> InitializeOrder()
{
    var viewModel = new OrderViewModel();
    return View(viewModel);
}`,
    explanation: "Modern forms replace command-line prompts with rich UI components and built-in validation.",
    terminalOutput: `Split-Load/BOL Entry System
Enter Customer ID: _`,
    uiUpdates: {
      customerId: '',
      customerName: '',
      rackPrice: 0,
      tax: 0,
      total: 0,
      inventory: 1000,
    },
  },
  {
    id: 1,
    unibasicCode: `* Read customer information
READV CUSTOMER, CUSTOMER.ID, 1, CUSTOMER.NAME
IF CUSTOMER.NAME = "" THEN
    PRINT "Customer not found"
    STOP
END`,
    csharpCode: `// Repository pattern with async operations
var customer = await _customerRepo.GetByIdAsync(customerId);
if (customer == null)
{
    return NotFound("Customer not found");
}`,
    explanation: "Repository pattern replaces direct file reads with structured data access and proper error handling.",
    terminalOutput: `Split-Load/BOL Entry System
Enter Customer ID: CUST001
Customer: ACME Oil Company`,
    uiUpdates: {
      customerId: 'CUST001',
      customerName: 'ACME Oil Company',
    },
  },
  {
    id: 2,
    unibasicCode: `* Get product information
PROMPT "Enter Product Code: "
INPUT PRODUCT.CODE
READV PRODUCT, PRODUCT.CODE, 2, RACK.PRICE`,
    csharpCode: `// Service layer with dependency injection
var product = await _productService.GetByCodeAsync(productCode);
var rackPrice = product.RackPrice;`,
    explanation: "Service layer isolates business logic and makes it testable and maintainable.",
    terminalOutput: `Split-Load/BOL Entry System
Enter Customer ID: CUST001
Customer: ACME Oil Company
Enter Product Code: DIESEL
Rack Price: $2.45/gallon`,
    uiUpdates: {
      rackPrice: 2.45,
    },
  },
  {
    id: 3,
    unibasicCode: `* Calculate tax
GOSUB CALC_TAX
CALC_TAX:
    IF STATE = "TX" THEN TAX.RATE = 0.0825
    IF STATE = "OK" THEN TAX.RATE = 0.045
    TAX.AMOUNT = GALLONS * RACK.PRICE * TAX.RATE
RETURN`,
    csharpCode: `// Dependency-injected tax service
var taxInfo = await _taxService.CalculateAsync(
    product, 
    gallons, 
    customer.State
);
var taxAmount = taxInfo.Amount;`,
    explanation: "Dependency injection makes tax calculation logic unit-testable and easily configurable.",
    terminalOutput: `Split-Load/BOL Entry System
Enter Customer ID: CUST001
Customer: ACME Oil Company
Enter Product Code: DIESEL
Rack Price: $2.45/gallon
Gallons: 1000
Tax (TX): $202.13`,
    uiUpdates: {
      tax: 202.13,
    },
  },
  {
    id: 4,
    unibasicCode: `* Calculate total
TOTAL.AMOUNT = (GALLONS * RACK.PRICE) + TAX.AMOUNT
PRINT "Total: $":TOTAL.AMOUNT`,
    csharpCode: `// Calculated property with real-time updates
public decimal Total => 
    (Gallons * RackPrice) + Tax;

// Auto-updating in the UI
@bind-value="orderViewModel.Total"`,
    explanation: "Modern UI provides real-time calculations without manual refresh commands.",
    terminalOutput: `Split-Load/BOL Entry System
Enter Customer ID: CUST001
Customer: ACME Oil Company
Enter Product Code: DIESEL
Rack Price: $2.45/gallon
Gallons: 1000
Tax (TX): $202.13
Total: $2,652.13`,
    uiUpdates: {
      total: 2652.13,
    },
  },
  {
    id: 5,
    unibasicCode: `* Write invoice record
WRITEV INVOICE, INVOICE.ID, 5, TOTAL.AMOUNT
WRITEV INVOICE, INVOICE.ID, 6, CUSTOMER.ID
PRINT "Invoice saved"`,
    csharpCode: `// Entity Framework with transactions
using var transaction = await _context.Database.BeginTransactionAsync();
try
{
    var invoice = new Invoice
    {
        CustomerId = customerId,
        Total = total,
        CreatedAt = DateTime.UtcNow
    };
    
    _context.Invoices.Add(invoice);
    await _context.SaveChangesAsync();
    await transaction.CommitAsync();
}
catch { await transaction.RollbackAsync(); throw; }`,
    explanation: "Entity Framework provides transaction safety and prevents data corruption.",
    terminalOutput: `Split-Load/BOL Entry System
Enter Customer ID: CUST001
Customer: ACME Oil Company
Enter Product Code: DIESEL
Rack Price: $2.45/gallon
Gallons: 1000
Tax (TX): $202.13
Total: $2,652.13
Invoice #INV-2024-001 saved`,
    uiUpdates: {},
  },
  {
    id: 6,
    unibasicCode: `* Update inventory
READV INVENTORY, TANK.NO, 3, CURRENT.QTY
NEW.QTY = CURRENT.QTY - GALLONS
WRITEU INVENTORY, TANK.NO, 3, NEW.QTY`,
    csharpCode: `// Event-driven inventory service
await _inventoryService.PostTransactionAsync(new InventoryTransaction
{
    TankId = tankId,
    Quantity = -gallons,
    TransactionType = TransactionType.Sale,
    ReferenceId = invoice.Id
});`,
    explanation: "Event-driven architecture ensures inventory updates are tracked and auditable.",
    terminalOutput: `Split-Load/BOL Entry System
Enter Customer ID: CUST001
Customer: ACME Oil Company
Enter Product Code: DIESEL
Rack Price: $2.45/gallon
Gallons: 1000
Tax (TX): $202.13
Total: $2,652.13
Invoice #INV-2024-001 saved
Inventory updated: Tank 1 (9000 gal remaining)`,
    uiUpdates: {
      inventory: 9000,
    },
  },
  {
    id: 7,
    unibasicCode: `* Generate BOL
PRINT "Generating Bill of Lading..."
GOSUB PRINT_BOL
PRINT "BOL completed"
STOP`,
    csharpCode: `// Modern document generation
var bolData = new BillOfLadingViewModel
{
    Invoice = invoice,
    Customer = customer,
    Products = orderItems
};

var pdf = await _documentService.GenerateBolAsync(bolData);
return File(pdf, "application/pdf", $"BOL-{invoice.Id}.pdf");`,
    explanation: "Modern document generation provides professional PDFs with digital signatures and email delivery.",
    terminalOutput: `Split-Load/BOL Entry System
Enter Customer ID: CUST001
Customer: ACME Oil Company
Enter Product Code: DIESEL
Rack Price: $2.45/gallon
Gallons: 1000
Tax (TX): $202.13
Total: $2,652.13
Invoice #INV-2024-001 saved
Inventory updated: Tank 1 (9000 gal remaining)
Generating Bill of Lading...
BOL completed: BOL-INV-2024-001.pdf

Process complete!`,
    uiUpdates: {},
  },
]