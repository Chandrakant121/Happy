import axios from "axios";
import React from "react";
import "../App.css";

const Posts = ({ posts, loading }) => {
    if (loading) {
        return <h2>Loading...</h2>;
    }

    const finduser = async () => {
        let url = "https://jsonplaceholder.typicode.com/users/";
        try {
            let res = await axios.get(url);
            alert(res.data[0].name);
        } catch (err) {
            alert("err");
        }
    };

    return (
        <>
            {posts.map((posts) => (
                <div className="subContainer">
                    <div>
                        <img
                            src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460__480.png"
                            alt="network err"
                        />
                        <h4>{posts.title}</h4>
                        <div>{posts.body}</div>
                        <button onClick={finduser}>User-Info</button>
                    </div>
                </div>
            ))}
        </>
    );
};

export default Posts;
