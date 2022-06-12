import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { create, findAll, findAllDND } from "../services/List.service";

export default function ListPage() {
  const { register, handleSubmit, reset } = useForm();
  const [list, setList] = useState();
  const [listID, setListID] = useState();

  const onSubmit = (data) => {
    create(data)
      .then((response) => {
        reset();
        rerenderList();
      })
      .catch((err) => console.log(err));
  };

  const rerenderList = () => {
    findAll()
      .then((response) => setList(response.data))
      .catch((err) => console.log(err));

    findAllDND()
      .then((response) => setListID(response.data))
      .catch((err) => console.log(err));
  };

  useEffect(() => rerenderList(), []);

  return (
    <div>
      <h1>Create</h1>
      <div className="listPage">
        <div>
          <p>Add a name</p>
          <form onSubmit={handleSubmit(onSubmit)}>
            <input
              type="text"
              placeholder="name"
              {...register("name", { required: true })}
            />
            <input type="submit" />
          </form>
          <hr />
        </div>

        <div className="mt-3">
          <h5>After the submit:</h5>
          <p>- in a collection a new element is created , with name and ID</p>
          {list &&
            list.map((el) => (
              <div key={el._id} className="collectionElements">
                <p>{el.name}</p>
                <p className="ms-5">{el._id}</p>
              </div>
            ))}
        </div>

        <div className="mt-4">
          <p> - in another collection, there is an array where we push only the ID </p>
          {listID &&
            listID.map((el) => (
              <div key={el._id} className="collectionElements">
                <p className="ms-5">{el._id}</p>
              </div>
            ))}
          <hr />
        </div>
        <p>
          To edit the sequence of the elements, <br /> we are going to modify
          the order of the elements in the array of IDs, <br />
          while the collection of names will be untouched and used only to get
          the datas(names) to populate the ID's array
        </p>
      </div>
    </div>
  );
}
