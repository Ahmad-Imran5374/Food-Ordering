import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

export default function AdminItems() {
  const [items, setItems] = useState([]);
  const [records, setRecords] = useState([]); 

  useEffect(() => {
    axios.get('http://localhost:3001/admin_items')
      .then(result => {
        setItems(result.data);
        setRecords(result.data);
      })
      .catch(err => {
        console.error("Error while fetching items:", err);
        alert("Error while fetching items. Please try again later.");
      });
  }, []);

  const filterItems = event => {
    const query = event.target.value.toLowerCase();
    if (items.length > 0) {
      setRecords(items.filter(item => item.item.toLowerCase().includes(query)));
    }
  }

  const removeItem = (id) => {
    if (window.confirm("Are you sure you want to delete this item?")) {
      axios.delete(`http://localhost:3001/delete_adminitems/${id}`)
        .then(result => {
          const prevItems = items.filter(item => item._id !== id);
          setItems(prevItems);
          setRecords(prevItems); // Update records after removing item
        })
        .catch(err => {
          console.error(err);
        });
    }
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <input
        type='search'
        placeholder='Search by product name'
        className="w-full px-4 py-2 mb-4 border border-gray-300 rounded-md"
        onChange={filterItems}
      />
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {records.map((item, index) => (
          <div key={item._id} className="border border-gray-300 rounded-md flex flex-col">
            <img src={require(`../images/${item.file}`)} alt={item.item} className="w-full h-auto max-h-48 object-cover rounded-t-md" />
            <div className="p-4 flex-grow">
              <h3 className="text-xl font-semibold mb-2">{item.item}</h3>
              <p className="mb-2">{item.details}</p>
              <p className="text-gray-700">Price: Rs {item.price}</p>
            </div>
            <div className="p-4 flex justify-between">
            <Link
                to={`/update_items/${item._id}/${item.item}/${item.price}/${item.details}/${item.file}`}
                className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-600"
              >
                Update
              </Link>
              <button
                className="bg-red-500 text-white py-2 px-4 rounded-md hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-600"
                onClick={() => removeItem(item._id)}
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
