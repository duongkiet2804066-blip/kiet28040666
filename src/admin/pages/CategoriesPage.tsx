import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { IconSax } from '../../components/IconSax';
import { logActivity } from '../services/adminService';

export const CategoriesPage: React.FC = () => {
  const { categories, setCategories, user, setActivityLogs } = useApp();
  const [search, setSearch] = useState('');
  const [newCatName, setNewCatName] = useState('');
  const [editingIdx, setEditingIdx] = useState<number | null>(null);
  const [editingVal, setEditingVal] = useState('');
  const [showAddModal, setShowAddModal] = useState(false);

  const handleAdd = (e: React.FormEvent) => {
    e.preventDefault();
    const name = newCatName.trim();
    if (!name) return;
    if (categories.includes(name)) {
      alert('Category already exists.');
      return;
    }
    setCategories(prev => [...prev, name]);
    logActivity(user.name, `Created Category: ${name}`, setActivityLogs);
    setNewCatName('');
    setShowAddModal(false);
  };

  const handleSaveEdit = (idx: number) => {
    const val = editingVal.trim();
    if (!val) return;
    setCategories(prev => prev.map((c, i) => i === idx ? val : c));
    logActivity(user.name, `Renamed Category to: ${val}`, setActivityLogs);
    setEditingIdx(null);
  };

  const handleDelete = (name: string) => {
    if (window.confirm(`Are you sure you want to delete the category "${name}"?`)) {
      setCategories(prev => prev.filter(c => c !== name));
      logActivity(user.name, `Deleted Category: ${name}`, setActivityLogs);
    }
  };

  const filteredCategories = categories.filter(c => c.toLowerCase().includes(search.toLowerCase()));

  return (
    <div className="text-start">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <div>
          <h4 className="fw-bold theme-color m-0">Categories Management</h4>
          <p className="text-muted fs-8 m-0">Create, edit, rename, and delete catalog categories.</p>
        </div>
        <button onClick={() => setShowAddModal(true)} className="btn btn-dark btn-sm rounded-pill px-3 py-2 fw-semibold fs-7">
          + Add Category
        </button>
      </div>

      {/* Toolbar */}
      <div className="card border-0 shadow-sm p-3 rounded-3 bg-white mb-3">
        <div className="input-group input-group-sm w-50">
          <span className="input-group-text bg-light border-end-0">
            <IconSax name="search-normal-2" className="fs-7 text-muted" />
          </span>
          <input 
            type="text" 
            className="form-control form-control-sm bg-light border-start-0" 
            placeholder="Search categories..." 
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
      </div>

      {/* Table List */}
      <div className="card border-0 shadow-sm rounded-3 overflow-hidden bg-white">
        <div className="table-responsive">
          <table className="table align-middle fs-7 mb-0 text-start">
            <thead>
              <tr className="table-light text-muted">
                <th>#</th>
                <th>Category Name</th>
                <th className="text-end">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredCategories.map((cat, idx) => (
                <tr key={idx}>
                  <td>{idx + 1}</td>
                  <td>
                    {editingIdx === idx ? (
                      <div className="d-flex gap-2 align-items-center w-75">
                        <input 
                          type="text" 
                          className="form-control form-control-sm" 
                          value={editingVal} 
                          onChange={(e) => setEditingVal(e.target.value)} 
                          required
                        />
                        <button onClick={() => handleSaveEdit(idx)} className="btn btn-sm btn-success py-1 px-3">Save</button>
                        <button onClick={() => setEditingIdx(null)} className="btn btn-sm btn-light border py-1 px-3">Cancel</button>
                      </div>
                    ) : (
                      <span className="fw-semibold theme-color">{cat}</span>
                    )}
                  </td>
                  <td className="text-end">
                    {editingIdx !== idx && (
                      <div className="d-flex justify-content-end gap-1">
                        <button 
                          onClick={() => { setEditingIdx(idx); setEditingVal(cat); }} 
                          className="btn btn-sm btn-light border p-1 rounded"
                          title="Rename Category"
                        >
                          <IconSax name="edit-2" className="fs-7 text-muted" />
                        </button>
                        <button 
                          onClick={() => handleDelete(cat)} 
                          className="btn btn-sm btn-light border p-1 rounded text-danger"
                          title="Delete Category"
                        >
                          <IconSax name="trash" className="fs-7" />
                        </button>
                      </div>
                    )}
                  </td>
                </tr>
              ))}
              {filteredCategories.length === 0 && (
                <tr>
                  <td colSpan={3} className="text-center py-4 text-muted">No categories match your search.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add Modal */}
      {showAddModal && (
        <>
          <div className="modal-backdrop fade show" style={{ zIndex: 1040 }} onClick={() => setShowAddModal(false)} />
          <div className="modal fade show d-block" tabIndex={-1} style={{ zIndex: 1050 }}>
            <div className="modal-dialog modal-dialog-centered" style={{ maxWidth: '350px' }}>
              <div className="modal-content border-0 p-3 rounded-4 shadow bg-white">
                <form onSubmit={handleAdd}>
                  <div className="modal-header border-0 p-0 mb-3 d-flex justify-content-between align-items-center">
                    <h5 className="modal-title fw-bold m-0">Add Category</h5>
                    <button type="button" className="btn-close" onClick={() => setShowAddModal(false)} />
                  </div>
                  <div className="modal-body p-0">
                    <div className="mb-3">
                      <label className="form-label fs-8 text-muted mb-1">Category Name</label>
                      <input 
                        type="text" 
                        className="form-control form-control-sm" 
                        value={newCatName} 
                        onChange={(e) => setNewCatName(e.target.value)} 
                        required 
                      />
                    </div>
                  </div>
                  <div className="modal-footer border-0 p-0 mt-3">
                    <button type="submit" className="btn btn-dark w-100 py-2 rounded-pill fs-7 fw-semibold">Save Category</button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};
export default CategoriesPage;
