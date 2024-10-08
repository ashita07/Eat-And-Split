import { useState } from "react";
const initialFriends = [
  {
    id: 112123,
    nameF: "Clark",
    image: "https://i.pravatar.cc/48?u=118836",
    balance: 0,
  },
  {
    id: 933372,
    nameF: "Sarah",
    image: "https://i.pravatar.cc/48?u=933372",
    balance: 0,
  },
  {
    id: 499476,
    nameF: "Anthony",
    image: "https://i.pravatar.cc/48?u=499476",
    balance: 0,
  },
];
export default function App() {
  const [showFriend, setShowFriend] = useState(false);
  const [friends, setFriends] = useState(initialFriends);
  const [selectedFriend, setSelectedFriend] = useState(null);

  function splitBill(event) {
    setFriends((friends) =>
      friends.map((friend) =>
        friend.id === selectedFriend.id
          ? { ...friend, balance: friend.balance + event }
          : friend
      )
    );
    setSelectedFriend(null);
  }

  function handleFriendList(friend) {
    setFriends((friends) => [...friends, friend]);
    setShowFriend(false);
  }

  function handleShowAddFriend() {
    setShowFriend((show) => !show);
  }

  function handleSelection(friend) {
    // setSelectedFriend(friend);
    setSelectedFriend((cur) => (cur?.id === friend.id ? null : friend));
    setShowFriend(false);
  }

  return (
    <div className="app">
      <div className="sidebar">
        <FriendList
          friends={friends}
          onSelection={handleSelection}
          selectedFriend={selectedFriend}
        />
        <AddFriend showFriend={showFriend} onAddFriend={handleFriendList} />
        <Button onClick={handleShowAddFriend}>
          {showFriend === false ? "Add Friend" : "Close"}
        </Button>
      </div>
      {selectedFriend === null ? null : (
        <FormSplitBill
          selectedFriend={selectedFriend}
          onSplit={splitBill}
          key={selectedFriend.id}
        />
      )}
    </div>
  );
}
function FriendList({ friends, onSelection, selectedFriend }) {
  return (
    <ul>
      {friends.map((f) => (
        <Friend
          friend={f}
          key={f.id}
          onSelection={onSelection}
          selectedFriend={selectedFriend}
        />
      ))}
    </ul>
  );
}
function Friend({ friend, onSelection, selectedFriend }) {
  const isSelected = selectedFriend?.id === friend.id;
  return (
    <li className={isSelected ? "selected" : null}>
      <img src={friend.image} alt={friend.name} />
      <h3>{friend.nameF}</h3>
      {friend.balance > 0 && (
        <p className="green">
          {friend.nameF} owes you ${Math.abs(friend.balance)}
        </p>
      )}
      {friend.balance < 0 && (
        <p className="red">
          you owe {friend.nameF} ${Math.abs(friend.balance)}
        </p>
      )}
      {friend.balance === 0 && (
        <p>You and your friend {friend.nameF} are even</p>
      )}
      <Button onClick={() => onSelection(friend)}>
        {isSelected ? "close" : "Select"}
      </Button>
    </li>
  );
}

function Button({ children, onClick }) {
  return (
    <button className="button" onClick={onClick}>
      {children}
    </button>
  );
}

function AddFriend({ showFriend, onAddFriend }) {
  const [nameF, setNameF] = useState("");
  const [image, setImage] = useState("https://i.pravatar.cc/48");

  function handleSubmit(e) {
    e.preventDefault();

    if (!nameF || !image) return;

    const id = crypto.randomUUID();
    const newFriend = {
      id,
      nameF,
      image: `${image}?=${id}`,
      balance: 0,
    };
    onAddFriend(newFriend);
    console.log(newFriend);
    setNameF("");
    setImage("https://i.pravatar.cc/48");
  }
  return (
    showFriend && (
      <form className="form-add-friend" onSubmit={handleSubmit}>
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
        <Button type="submit" className="button">
          Add
        </Button>
      </form>
    )
  );
}

function FormSplitBill({ selectedFriend, onSplit }) {
  const [bill, SetBill] = useState("");
  const [expenseUser, setExpenseUser] = useState("");
  const [whoPays, setWhoPays] = useState("user");
  const othersExpense = bill ? bill - expenseUser : "";

  function handleSubmitForm(e) {
    e.preventDefault();
    if (!bill || !expenseUser) return;
    onSplit(whoPays === "User" ? expenseUser : -expenseUser);
  }

  return (
    <form className="form-split-bill" onSubmit={handleSubmitForm}>
      <h2>Split the bill with {selectedFriend.nameF}</h2>
      <label> 💲Bill Value</label>
      <input
        type="text"
        value={bill}
        onChange={(e) => SetBill(Number(e.target.value))}
      />
      <label>😅Your expense</label>
      <input
        type="text"
        value={expenseUser}
        onChange={(e) =>
          setExpenseUser(
            Number(e.target.value) > bill ? expenseUser : Number(e.target.value)
          )
        }
      />
      <label>🙃{selectedFriend.nameF}'s expense</label>
      <input type="text" disabled value={othersExpense} />
      <label>😏Who is paying the bill?</label>
      <select>
        <option value={whoPays} onChange={(e) => setWhoPays(e.target.value)}>
          YOU
        </option>
        <option value="friend">{selectedFriend.nameF}</option>
      </select>
      <Button>Split Bill</Button>
    </form>
  );
}
