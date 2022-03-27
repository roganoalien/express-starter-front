import { useEffect, useState } from "react";
import Router from "next/router";
import Head from "next/head";
import { AppProps } from "next/dist/shared/lib/router/router";
import { AnimatePresence } from "framer-motion";
//REDUX
import { Provider } from "react-redux";
import store from "../redux/store";
import { PersistGate } from "redux-persist/integration/react";
import { persistStore } from "redux-persist";
// import Layout from "../layout";
// import FullLoader from "../components/FullLoader";
import "../styles/globals.css";
import GlobalLoader from "../components/global/global.loader";
import GlobalAlert from "../components/global/global.alert";

let persistor = persistStore(store);

function MyApp({ Component, pageProps }: AppProps) {
	const [loadingPage, setLoadingPage] = useState<boolean>(false);

	const startChange = () => {
		setLoadingPage(true);
	};
	const stopChange = () => {
		setLoadingPage(false);
	};

	useEffect(() => {
		Router.events.on("routeChangeStart", startChange);
		Router.events.on("routeChangeComplete", stopChange);
		Router.events.on("routeChangeError", stopChange);
		return () => {
			Router.events.off("routeChangeStart", startChange);
			Router.events.off("routeChangeComplete", stopChange);
			Router.events.off("routeChangeError", stopChange);
		};
	}, []);

	return (
		<>
			<Head>
				<meta name="viewport" content="width=device-width, initial-scale=1.0" />
			</Head>
			<AnimatePresence exitBeforeEnter>
				{/* {loadingPage ? (
					
				) : null} */}
			</AnimatePresence>
			<Provider store={store}>
				<PersistGate loading={null} persistor={persistor}>
					<AnimatePresence exitBeforeEnter>
						<GlobalLoader key="globalLoader-component" loading={loadingPage} />
						<GlobalAlert key="globalAlert-component" />
					</AnimatePresence>
					<Component {...pageProps} />
				</PersistGate>
			</Provider>
		</>
	);
}

export default MyApp;
