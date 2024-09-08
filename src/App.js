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
  return (
    <div className="app">
      <div className="sidebar">
        <FriendList />
        <AddFriend />
        <Button>Add Friend</Button>
      </div>
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

function Button({ children }) {
  return <button className="button">{children}</button>;
}

function AddFriend() {
  return (
    <form className="form-add-friend">
      <label>🙃Friend</label>
      <input type="text" />
      <label>🙃Image url</label>
      <input type="text" />
      <Button>Add</Button>
    </form>
  );
}
