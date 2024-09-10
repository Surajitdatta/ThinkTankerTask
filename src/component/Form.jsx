import React, { useState } from 'react';
import './Form.css';
import Swal from 'sweetalert2';
import Table from './Table';

const SimpleForm = () => {
  const [productName, setProductName] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");
  const [tags, setTags] = useState([]);
  const [description, setDescription] = useState("");
  const [available, setAvailable] = useState(false);
  const [productImage, setProductImage] = useState(null);

  const [products, setProducts] = useState([]);
  const [editingIndex, setEditingIndex] = useState(null);

  const [filter, setFilter] = useState("")

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;

    if (type === 'checkbox') {
      if (name === 'available') {
        setAvailable(checked);
      } else if (name === 'tags') {
        setTags((prevTags) =>
          checked ? [...prevTags, value] : prevTags.filter((tag) => tag !== value)
        );
      }
    } else if (type === 'file') {
      setProductImage(e.target.files[0]);
    } else if (type === 'radio') {
      if (name === 'category') {
        setCategory(value);
      }
    } else {
      if (name === 'productName') setProductName(value);
      if (name === 'price') setPrice(value);
      if (name === 'description') setDescription(value);
    }
  };

  const validateForm = () => {
    if (!productName || !price || !category || !description || price < 0) {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'All fields except Tags, Available, and Product Image are required!',
      });
      return false;
    }
    return true;
  };



  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      const newProduct = {
        productName,
        price,
        category,
        tags,
        description,
        available,
        productImage: productImage ? URL.createObjectURL(productImage) : null,
      };

      if (editingIndex !== null) {
        const updatedProducts = [...products]; // Create a shallow copy of the products array
        updatedProducts.splice(editingIndex, 1, newProduct); // Replace the product at editingIndex with newProduct
        setProducts(updatedProducts); // Update the state with the modified products array
        setEditingIndex(null); // Reset editingIndex to null
      } else {
        setProducts([...products, newProduct]);
      }

      setProductName("");
      setPrice("");
      setCategory("");
      setTags([]);
      setDescription("");
      setAvailable(false);
      setProductImage(null);
    }
  };

  const edit = (index) => {
    const productToEdit = products[index];
    setProductName(productToEdit.productName);
    setPrice(productToEdit.price);
    setCategory(productToEdit.category);
    setTags(productToEdit.tags);
    setDescription(productToEdit.description);
    setAvailable(productToEdit.available);
    setProductImage(null);
    setEditingIndex(index);
  };

  


  //filtering the prodct
  const filteredProducts = products.filter((product) =>
    product.productName.toLowerCase().includes(filter.toLowerCase())
  );

  return (
    <>
      <h2>Product form</h2>
      <form className="product-form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="productName">Product Name</label>
          <input
            type="text"
            id="productName"
            name="productName"
            onChange={handleInputChange}
            value={productName}
          />
        </div>

        <div className="form-group">
          <label htmlFor="price">Price</label>
          <input
            type="number"
            id="price"
            name="price"
            onChange={handleInputChange}
            value={price}
          />
        </div>

        <div className="form-group">
          <label>Category</label>
          <div className="category-options">
            <label>
              <input
                type="radio"
                name="category"
                value="Electronics"
                onChange={handleInputChange}
                checked={category === 'Electronics'}
              />
              Electronics
            </label>
            <label>
              <input
                type="radio"
                name="category"
                value="Clothing"
                onChange={handleInputChange}
                checked={category === 'Clothing'}
              />
              Clothing
            </label>
            <label>
              <input
                type="radio"
                name="category"
                value="Other"
                onChange={handleInputChange}
                checked={category === 'Other'}
              />
              Other
            </label>
          </div>
        </div>

        <div className="form-group">
          <label>Tags</label>
          <div className="tags">
            <label>
              <input
                type="checkbox"
                name="tags"
                value="New"
                onChange={handleInputChange}
                checked={tags.includes('New')}
              />
              New
            </label>
            <label>
              <input
                type="checkbox"
                name="tags"
                value="Sale"
                onChange={handleInputChange}
                checked={tags.includes('Sale')}
              />
              Sale
            </label>
            <label>
              <input
                type="checkbox"
                name="tags"
                value="Best Seller"
                onChange={handleInputChange}
                checked={tags.includes('Best Seller')}
              />
              Best Seller
            </label>
          </div>
        </div>

        <div className="form-group">
          <label htmlFor="description">Description</label>
          <textarea
            id="description"
            name="description"
            onChange={handleInputChange}
            value={description}
          ></textarea>
        </div>

        <div className="form-group">
          <label>
            <input
              type="checkbox"
              name="available"
              onChange={handleInputChange}
              checked={available}
            />
            Available
          </label>
        </div>

        <div className="form-group">
          <label htmlFor="productImage">Product Image</label>
          <input
            type="file"
            id="productImage"
            name="productImage"
            onChange={handleInputChange}
          />
        </div>

        <button type="submit">Submit</button>
      </form>

      <div className="filter-container">
        <label htmlFor="filter">Filter by Product Name:</label>
        <input
          type="text"
          id="filter"
          name="filter"
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
        />
      </div>

      <Table data={filteredProducts} edit={edit}   />
    </>
  );
};

export default SimpleForm;
