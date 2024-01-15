import React, { useRef, useState, useEffect } from "react";
import { useCart, useDispatchCart } from "./ContextReducer";

export default function Card(props) {
  let dispatch = useDispatchCart();
  let data = useCart();
  const priceRef = useRef();
  let options = props.options;
  let priceOptions = Object.keys(options);
  const [qty, setQty] = useState(1);
  const [size, setSize] = useState();

  useEffect(() => {
    setSize(priceRef.current.value);
  }, []);


  const handleAddToCart = async () => {
    let existingItem = data.find(
      item => item.id === props.foodItem._id && item.size === size
    );

    if (existingItem) {
      dispatch({
        type: "UPDATE",
        id: existingItem.id,
        size: existingItem.size,
        price: finalPrice,
        qty: existingItem.qty + qty,
      });
    } else {
      let itemWithSameId = data.find(item => item.id === props.foodItem._id);
      if (itemWithSameId) {
        dispatch({
          type: "ADD",
          id: props.foodItem._id,
          name: props.foodItem.name,
          price: finalPrice,
          qty: qty,
          size: size,
        });
      } else {
        dispatch({
          type: "ADD",
          id: props.foodItem._id,
          name: props.foodItem.name,
          price: finalPrice,
          qty: qty,
          size: size,
        });
      }
    }
  };
  const increment = () => {
    setQty((prev) => prev + 1);
  };

  const decrement = () => {
    if (qty > 1) {
      setQty((prev) => prev - 1);
    }
  };

  // const handleAddToCart = async () => {
  //   console.log("UPDATE", props.foodItem._id);

  //   let food = [];
  //   for (const item of data) {
  //     console.log("item", item,data,props.foodItem._id);

  //     if (item.id === props.foodItem._id) {
  //       food = item;

  //       break;
  //     }
  //   }
  //   console.log("Prev food",food, food.length,food.size);

  //   if (food.length > 0) {
  //     console.log("food", food.length,food.size);
  //     if (food.size === size) {
  //       console.log("UPDATE", food.size);

  //       await dispatch({
  //         type: "UPDATE",
  //         id: props.foodItem._id,
  //         price: finalPrice,
  //         qty: qty,
  //       });
  //       return;
  //     } else if (food.size !== size) {
  //       console.log("ADD22", food.size);

  //       await dispatch({
  //         type: "ADD",
  //         id: props.foodItem._id,
  //         name: props.foodItem.name,
  //         price: finalPrice,
  //         qty: qty,
  //         size: size,
  //         img: props.foodItem.img,
  //       });
  //       return;
  //     }
  //     return;
  //   }
  //   console.log("ADD11", food.size);

  //   await dispatch({
  //     type: "ADD",
  //     id: props.foodItem._id,
  //     name: props.foodItem.name,
  //     price: finalPrice,
  //     qty: qty,
  //     size: size,
  //   });
  // };

  let finalPrice = qty * parseInt(options[size]);

  return (
    <div>
      <div>
        <div
          className="card mt-3"
          style={{ width: "18rem", maxHeight: "400px" }}
        >
          <img
            src={props.foodItem.img}
            className="card-img-top"
            alt="..."
            style={{ height: "150px", objectFit: "fill" }}
          />
          <div className="m-3">
            <h5 className="card-title">{props.foodItem.name}</h5>
            <div className="d-flex py-2 align-items-center w-100">
              <div className="d-flex">
                <button onClick={decrement}>-</button>
                <div className="mx-3">{qty}</div>
                <button onClick={increment}>+</button>
              </div>
              <select
                className="mx-5 p-1 h-100 bg-success rounded"
                ref={priceRef}
                onChange={(e) => setSize(e.target.value)}
              >
                {priceOptions.map((data) => {
                  return (
                    <option key={data} value={data}>
                      {data}
                    </option>
                  );
                })}
              </select>
            </div>
            <div className="d-inline h-100 fs-5 pt-3">₹{finalPrice}/-</div>
            <hr />
          </div>


          <button
            className="btn btn-warning text-dark mb-4 m-auto"
            onClick={handleAddToCart}
          >
            Add to Cart
          </button>

        </div>
      </div>
    </div>
  );
}
