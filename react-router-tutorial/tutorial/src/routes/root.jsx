import {
  Outlet,
  useLoaderData,
  Form,
  redirect,
  NavLink,
  useNavigation,
  useSubmit,
} from "react-router-dom";
import { useEffect } from "react";
import { getContacts, createContact } from "../contacts";

// loaderとactionの設定
// これらはbrowser routerの設定ファイルからimportして使う
export async function loader({ request }) {
  const url = new URL(request.url);
  const q = url.searchParams.get("q");
  const contacts = await getContacts(q);
  return { contacts, q };
}
export async function action() {
  const contact = await createContact();
  return redirect(`/contacts/${contact.id}/edit`);
}

export default function Root() {
  // browser routerで設定されたloaderからデータを取得
  const { contacts, q } = useLoaderData();
  const navigation = useNavigation();
  const submit = useSubmit();

  // navigation.location はページ遷移中だと遷移先のURLが値に入る。遷移中でないとnullかundefined
  const searching =
    navigation.location &&
    new URLSearchParams(navigation.location.search).has("q");

  useEffect(() => {
    document.getElementById("q").value = q;
  }, [q]);

  return (
    <>
      <div id="sidebar">
        <h1>React Router Contacts</h1>
        <div>
          <Form id="search-form" role="search">
            <input
              id="q"
              className={searching ? "loading" : ""}
              aria-label="Search contacts"
              placeholder="Search"
              type="search"
              name="q"
              //   defaultValue={q}
              // イベントハンドラはstateと同じくスナップショットなので、q=null の状態から発火したときは isFirstSearch=true
              onChange={(event) => {
                const isFirstSearch = q == null;
                // ここの event.currentTarget.form はいったん暗記でよいかも
                submit(event.currentTarget.form, {
                  // replace: true のときブラウザの最新の履歴を上書きする
                  replace: !isFirstSearch,
                });
              }}
            />
            <div id="search-spinner" aria-hidden hidden={!searching} />
            <div className="sr-only" aria-live="polite"></div>
          </Form>
          {/* NOTE: この部分は普通のformタグを模倣している。ただし、普通のformタグだとviteサーバにPOSTが送られて404エラーになる */}
          {/* react-router ではPOSTの代わりにroute actionに指定した関数が実行される */}
          {/* しかも、actionが走った後には useLoaderData が自動的にrevalidateされる。really cool! */}
          <Form method="post">
            <button type="submit">New</button>
          </Form>
        </div>
        <nav>
          {contacts.length ? (
            <ul>
              {contacts.map((contact) => (
                <li key={contact.id}>
                  {/* NavLinkはclassNameに関数を渡せる。Linkではできない。 */}
                  <NavLink
                    to={`contacts/${contact.id}`}
                    className={({ isActive, isPending }) =>
                      isActive ? "active" : isPending ? "pending" : ""
                    }
                  >
                    {contact.first || contact.last ? (
                      <>
                        {contact.first} {contact.last}
                      </>
                    ) : (
                      <i>No Name</i>
                    )}{" "}
                    {contact.favorite && <span>★</span>}
                  </NavLink>
                </li>
              ))}
            </ul>
          ) : (
            <p>
              <i>No contacts</i>
            </p>
          )}
        </nav>
      </div>
      <div
        id="detail"
        className={navigation.state === "loading" ? "loading" : ""}
      >
        <Outlet />
      </div>
    </>
  );
}
