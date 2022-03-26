import Document, { Html, Head, Main, NextScript } from "next/document";

class MyDocument extends Document {
	render() {
		return (
			<Html lang="es">
				<Head>
					<meta charSet="UTF-8" />
					<meta name="description" content="Express Starter Front Integration" />
					<link rel="preconnect" href="https://fonts.googleapis.com" />
					<link
						rel="preconnect"
						href="https://fonts.gstatic.com"
						crossOrigin="true"
					/>
					<link
						href="https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;700;900&display=swap"
						rel="stylesheet"
					/>
				</Head>
				<body className="min-h-screen w-screen overflow-x-hidden bg-mWhite">
					<Main />
					<NextScript />
				</body>
			</Html>
		);
	}
}

export default MyDocument;
