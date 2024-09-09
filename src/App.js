import { useState } from "react";
const initialFriends = [
  {
    id: 112123,
    name: "Clark",
    image: "https://i.pravatar.cc/48?u=118836",
    balance: -7,
  },
  {
    id: 933372,
    name: "Sarah",
    image: "https://i.pravatar.cc/48?u=933372",
    balance: 20,
  },
  {
    id: 499476,
    name: "Anthony",
    image: "https://i.pravatar.cc/48?u=499476",
    balance: 0,
  },
];
export default function App() {
  const [showFriend, setShowFriend] = useState(false);

  return (
    <div className="app">
      <div className="sidebar">
        <FriendList />
        <AddFriend showFriend={showFriend} addShowFriend={setShowFriend} />
        <Button addShowFriend={setShowFriend} showFriend={showFriend}>
          {showFriend === false ? "Add Friend" : "Close"}
        </Button>
      </div>
      <FormSplitBill />
    </div>
  );
}
function FriendList() {
  const friend = initialFriends;
  return (
    <ul>
      {friend.map((f) => (
        <Friend friend={f} key={f.id} />
      ))}
    </ul>
  );
}
function Friend({ friend }) {
  return (
    <li>
      <img src={friend.image} alt={friend.name} />
      <h3>{friend.name}</h3>
      {friend.balance > 0 && (
        <p className="green">
          {friend.name} owes you ${Math.abs(friend.balance)}
        </p>
      )}
      {friend.balance < 0 && (
        <p className="red">
          you owe {friend.name} ${Math.abs(friend.balance)}
        </p>
      )}
      {friend.balance === 0 && (
        <p>You and your friend {friend.name} are even</p>
      )}
      <button className="button">Select</button>
    </li>
  );
}

function Button({ children, showFriend, addShowFriend }) {
  return (
    <button className="button" onClick={() => addShowFriend(!showFriend)}>
      {children}
    </button>
  );
}

function AddFriend({ showFriend }) {
  const [nameF, setNameF] = useState("");
  const [image, setImage] = useState("https://i.pravatar.cc/48");

  return (
    showFriend && (
      <form className="form-add-friend">
        <label>🙃Friend</label>
        <input
          type="text"
          value={nameF}
          onChange={(e) => setNameF(e.target.value)}
        />
        <label>🙃Image url</label>
        <input
          type="text"
          value={image}
          onChange={(e) => setImage(e.target.value)}
        />
        <Button>Add</Button>
      </form>
    )
  );
}

function FormSplitBill() {
  return (
    <form className="form-split-bill">
      <h2>Split the bill with X</h2>
      <label> 💲Bill Value</label>
      <input type="text" />
      <label>😅Your expense</label>
      <input type="text" />
      <label>🙃X's expense</label>
      <input type="text" disabled />
      <label>😏Who is paying the bill?</label>
      <select>
        <option value="user">YOU</option>
        <option value="friend">X</option>
      </select>
    </form>
  );
}
