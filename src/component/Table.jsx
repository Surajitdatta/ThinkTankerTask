import React from 'react';
import './Table.css';

const Table = ({ data, edit, deleteProduct }) => {
  return (
    <div className="table-container">
      <table>
        <thead>
          <tr>
            <th>Product Name</th>
            <th>Price</th>
            <th>Category</th>
            <th>Tags</th>
            <th>Description</th>
            <th>Available</th>
            <th>Product Image</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item, index) => (
            <tr key={index}>
              <td>{item.productName}</td>
              <td>{item.price}</td>
              <td>{item.category}</td>
              <td>{item.tags.join(', ')}</td>
              <td>{item.description}</td>
              <td>{item.available ? 'Yes' : 'No'}</td>
              <td>
                {item.productImage && (
                  <img
                    src={item.productImage}
                    alt={item.productName}
                    className="product-image"
                  />
                )}
              </td>
              <td>
                <button
                  className="edit-button"
                  onClick={() => edit(index)}
                >
                  Edit
                </button>
                <button
                  className="delete-button"
                  onClick={() => deleteProduct(index)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Table;
