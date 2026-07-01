import React from 'react';
import { useApp } from '../../context/AppContext';
import { logActivity } from '../services/adminService';

export const InventoryPage: React.FC = () => {
  const { products, setProducts, user, setActivityLogs } = useApp();

  const handleAdjustStock = (id: number, amount: number) => {
    setProducts(prev => prev.map(p => {
      if (p.id === id) {
        const currentVal = (p as any).stock !== undefined ? (p as any).stock : 25;
        const newVal = Math.max(0, currentVal + amount);
        logActivity(user.name, `Adjusted stock for ${p.name}: ${newVal} units`, setActivityLogs);
        return { ...p, stock: newVal };
      }
      return p;
    }));
  };

  return (
    <div className="text-start">
      <div className="mb-3">
        <h4 className="fw-bold theme-color m-0">Inventory Levels</h4>
        <p className="text-muted fs-8 m-0">Monitor catalog stock, adjust inventory levels, and check SKU codes.</p>
      </div>
      
      <div className="card border-0 shadow-sm rounded-3 overflow-hidden bg-white">
        <div className="table-responsive">
          <table className="table align-middle fs-7 mb-0 text-start">
            <thead>
              <tr className="table-light text-muted">
                <th>Product</th>
                <th>SKU Identifier</th>
                <th>Remaining Quantity</th>
                <th className="text-end">Inventory Controls</th>
              </tr>
            </thead>
            <tbody>
              {products.map((p) => {
                const stockQty = (p as any).stock !== undefined ? (p as any).stock : 25;
                const skuId = (p as any).sku || `FUZ-${p.id}`;
                return (
                  <tr key={p.id}>
                    <td className="fw-semibold theme-color">{p.name}</td>
                    <td><code className="bg-light text-dark border fs-8">{skuId}</code></td>
                    <td>
                      <span className={`fw-bold ${stockQty < 5 ? 'text-danger' : 'text-success'}`}>
                        {stockQty} available
                      </span>
                    </td>
                    <td className="text-end">
                      <div className="d-flex justify-content-end gap-1">
                        <button onClick={() => handleAdjustStock(p.id, -5)} className="btn btn-sm btn-light border py-1 px-2 font-monospace">-5</button>
                        <button onClick={() => handleAdjustStock(p.id, -1)} className="btn btn-sm btn-light border py-1 px-2 font-monospace">-1</button>
                        <button onClick={() => handleAdjustStock(p.id, 1)} className="btn btn-sm btn-light border py-1 px-2 font-monospace">+1</button>
                        <button onClick={() => handleAdjustStock(p.id, 5)} className="btn btn-sm btn-light border py-1 px-2 font-monospace">+5</button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
export default InventoryPage;
