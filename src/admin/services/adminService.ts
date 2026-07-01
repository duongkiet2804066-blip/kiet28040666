// Admin services helper file for Fuzzy Furniture PWA
import type { Order } from '../../context/AppContext';

export interface ActivityLog {
  id: string;
  admin: string;
  action: string;
  date: string;
}

export const logActivity = (
  adminName: string,
  action: string,
  setLogs: React.Dispatch<React.SetStateAction<ActivityLog[]>>
) => {
  const newLog: ActivityLog = {
    id: `log-${Date.now()}`,
    admin: adminName,
    action,
    date: new Date().toISOString().replace('T', ' ').substring(0, 19)
  };
  setLogs((prev) => [newLog, ...prev]);
};

export const exportOrderInvoicePDF = (order: Order) => {
  // Generate basic mock invoice details for printing
  const invoiceWindow = window.open('', '_blank');
  if (!invoiceWindow) return false;

  const html = `
    <html>
      <head>
        <title>Invoice - ${order.id}</title>
        <style>
          body { font-family: 'Poppins', sans-serif; padding: 30px; color: #122636; }
          .header { display: flex; justify-content: space-between; border-bottom: 2px solid #122636; padding-bottom: 10px; }
          .details { margin: 20px 0; line-height: 1.6; }
          .table { width: 100%; border-collapse: collapse; margin-top: 20px; }
          .table th, .table td { border: 1px solid #e0e0e0; padding: 12px; text-align: left; }
          .table th { background-color: #f4f5f7; }
          .total-box { margin-top: 20px; text-align: right; font-size: 18px; font-weight: bold; }
        </style>
      </head>
      <body>
        <div class="header">
          <h2>FUZZY FURNITURE INVOICE</h2>
          <h3>ID: ${order.id}</h3>
        </div>
        <div class="details">
          <p><strong>Date:</strong> ${order.date}</p>
          <p><strong>Customer Name:</strong> ${order.address.name}</p>
          <p><strong>Phone:</strong> ${order.address.phone}</p>
          <p><strong>Delivery Address:</strong> ${order.address.houseNo}, ${order.address.locality}, ${order.address.city}, ${order.address.state}</p>
          <p><strong>Shipping:</strong> ${order.shippingMethod}</p>
          <p><strong>Payment Method:</strong> ${order.paymentMethod}</p>
        </div>
        <table class="table">
          <thead>
            <tr>
              <th>Product</th>
              <th>Color</th>
              <th>Size</th>
              <th>Qty</th>
              <th>Price</th>
              <th>Subtotal</th>
            </tr>
          </thead>
          <tbody>
            ${order.items.map(item => `
              <tr>
                <td>${item.product.name}</td>
                <td>${item.selectedColor || 'Default'}</td>
                <td>${item.selectedSize || 'M'}</td>
                <td>${item.quantity}</td>
                <td>$${item.product.price}</td>
                <td>$${item.product.price * item.quantity}</td>
              </tr>
            `).join('')}
          </tbody>
        </table>
        <div class="total-box">
          <p>Subtotal: $${order.subtotal}</p>
          <p>Shipping Charge: $${order.shippingFee}</p>
          <p>Promo Discount: -$${order.discount}</p>
          <p style="font-size: 22px; color: #ff4f4f;">Grand Total: $${order.total}</p>
        </div>
        <script>
          window.onload = function() { window.print(); }
        </script>
      </body>
    </html>
  `;
  invoiceWindow.document.write(html);
  invoiceWindow.document.close();
  return true;
};
