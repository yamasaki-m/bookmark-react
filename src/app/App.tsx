import { useEffect } from "react";

import { useDispatch, useSelector } from "react-redux";
import { Switch, Route, Redirect } from "react-router-dom";
import { useLocation } from "react-router";
import { AnimatePresence } from "framer-motion";

import { RootState } from "./store";
import { tryFetchCards } from "../features/card/cardSlice";
import { loadTheme } from "../features/theme/themeSlice";
import { FadeAnimation } from "../common/components/Animations";
import Navigation from "../features/navigation/Navigation";
import Auth from "../features/auth/Auth";
import CreateCard from "../features/card/CreateCard";
import StoredCards from "../features/card/StoredCards";

function App() {
  const location = useLocation();
  const [_, rootPath] = location.pathname.split("/");

  const dispatch = useDispatch();
  const { id: userId, token } = useSelector(
    (state: RootState) => state.auth.user
  );

  useEffect(() => {
    const fetchCard = async () =>
      dispatch(await tryFetchCards({ userId, token }));

    fetchCard();
  }, [dispatch, userId, token]);

  useEffect(() => {
    dispatch(loadTheme());
  }, [dispatch]);

  return (
    <>
      <Navigation />

      <AnimatePresence exitBeforeEnter initial>
        <Switch location={location} key={rootPath}>
          <Route path="/auth" exact component={Auth}></Route>

          <Route path="/home" exact component={StoredCards}></Route>

          <Route path="/create" exact component={CreateCard} />

          <Route path="*">
            <FadeAnimation>
              <Redirect to="/auth" />
            </FadeAnimation>
          </Route>
        </Switch>
      </AnimatePresence>
    </>
  );
}

export default App;
