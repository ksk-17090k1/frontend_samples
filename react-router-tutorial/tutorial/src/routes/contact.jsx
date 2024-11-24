import { Form, useLoaderData, useFetcher } from "react-router-dom";
import { getContact, updateContact } from "../contacts";

export async function loader({ params }) {
  // params.contactId でURL Paramsを取得できる
  const contact = await getContact(params.contactId);
  // エラーハンドリング
  // ErrorでなくてResponseをthrowしているのなにげにポイントかも
  if (!contact) {
    throw new Response("", {
      status: 404,
      statusText: "Not Found",
    });
  }
  return { contact };
}

export async function action({ request, params }) {
  const formData = await request.formData();
  return updateContact(params.contactId, {
    favorite: formData.get("favorite") === "true",
  });
}

export default function Contact() {
  const { contact } = useLoaderData();

  return (
    <div id="contact">
      <div>
        <img
          key={contact.avatar}
          src={
            contact.avatar ||
            `https://robohash.org/${contact.id}.png?size=200x200`
          }
        />
      </div>

      <div>
        <h1>
          {contact.first || contact.last ? (
            <>
              {contact.first} {contact.last}
            </>
          ) : (
            <i>No Name</i>
          )}{" "}
          <Favorite contact={contact} />
        </h1>

        {contact.twitter && (
          <p>
            <a target="_blank" href={`https://twitter.com/${contact.twitter}`}>
              {contact.twitter}
            </a>
          </p>
        )}

        {contact.notes && <p>{contact.notes}</p>}

        <div>
          {/* actionで相対パスを指定できる！この場合は ./edit に飛ぶ */}
          <Form action="edit">
            <button type="submit">Edit</button>
          </Form>
          {/* actionで相対パスを指定できる！この場合は ./destroy に飛ぶ */}
          <Form
            method="post"
            action="destroy"
            // onSubmitで確認ダイアログを表示する実装。event.preventDefault() の使い方などふつうに参考になる。
            // あと地味に onSubmit が実行された後に Form によりactionが実行されることに注意。
            onSubmit={(event) => {
              if (!confirm("Please confirm you want to delete this record.")) {
                event.preventDefault();
              }
            }}
          >
            <button type="submit">Delete</button>
          </Form>
        </div>
      </div>
    </div>
  );
}

const Favorite = ({ contact }) => {
  const fetcher = useFetcher();
  // fetcher.formData はOptimistic UIと呼ばれる。
  // fetcher.formDataはsubmitされたデータに即アクセスできる。
  // actionが実行完了すると、fetcher.formDataはnullになり、下のコードだとloadされたcontact.favoriteが使われる。
  const favorite = fetcher.formData
    ? fetcher.formData.get("favorite") === "true"
    : contact.favorite;

  return (
    // navigationを発生させずに action -> load を実行したい場合は、fetcher.Form を使う
    <fetcher.Form method="post">
      {/* 地味にbutton単体で完結させてsubmit飛ばせるんだとおもった。 */}
      <button
        name="favorite"
        value={favorite ? "false" : "true"}
        aria-label={favorite ? "Remove from favorites" : "Add to favorites"}
      >
        {favorite ? "★" : "☆"}
      </button>
    </fetcher.Form>
  );
};
