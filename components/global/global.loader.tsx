import { motion } from "framer-motion";
import { loadStatus } from "../../redux/store";
import { useSelector } from "react-redux";
import { ComponentGlobalLoader } from "../../types";

export default function GlobalLoader({ loading }: ComponentGlobalLoader) {
	const { isLoading } = useSelector(loadStatus);

	return (
		<>
			{/* loading || isLoading */}
			{loading || isLoading ? (
				<motion.div
					key="loading-logo-animation"
					initial={{ opacity: 0, y: 100 }}
					animate={{ opacity: 1, y: 0 }}
					exit={{ opacity: 0 }}
					className="pointer-events-none fixed right-4 bottom-4 z-999 flex h-auto w-auto items-center justify-center p-10"
				>
					<motion.svg
						key="loading-logo-vector"
						animate={{
							rotateY: [0, 720]
						}}
						transition={{
							repeat: Infinity,
							repeatDelay: 0.5
						}}
						viewBox="0 0 68 86"
						className="h-20 w-20 opacity-100"
					>
						<g fill="none">
							<path
								fill="#868D98"
								d="M60.283 24.0003171 60.2874996 24.523491C60.2874996 28.7368425 59.1994042 32.447833 57.0232136 35.6564623 54.9340706 38.7367464 51.9674875 41.1449685 48.1234643 42.8811286L47.6383915 43.0946483 66 71 38.0495514 71 24.1763361 46.4005088 23.4622735 46.4005088 23.4622735 71 .000218163294 71 0 53.9123171 60.283 24.0003171ZM37.7516452 0C41.2468897 0 44.7253301.338828197 48.1869664 1.01648459 51.6486027 1.69414099 54.7405497 2.88810701 57.4628074 4.59838267 60.1850651 6.30865833 62.386397 8.59978233 64.066803 11.4717547 64.9359092 12.9571392 65.5802645 14.636742 65.9998688 16.510563L7 46.001 7.00021563 0 37.7516452 0ZM35.735158 17.9094904 29.9881695 17.9094904 29.9881695 28.9456088 34.7269144 28.9456088C35.5335093 28.9456088 36.4241245 28.8810701 37.3987599 28.7519927 38.3733954 28.6229153 39.2808147 28.3486258 40.1210176 27.9291242 40.9612206 27.5096227 41.6669912 26.9287743 42.2383292 26.1865792 42.8096672 25.4443841 43.0953362 24.4601689 43.0953362 23.2339335 43.0953362 22.0076981 42.8600794 21.0396176 42.3895657 20.3296918 41.9190521 19.6197661 41.3141059 19.0873218 40.5747273 18.7323589 39.8353486 18.377396 39.0287538 18.1515106 38.1549426 18.0547025 37.2811315 17.9578944 36.4745367 17.9094904 35.735158 17.9094904Z"
								transform="translate(1)"
							/>
						</g>
					</motion.svg>
				</motion.div>
			) : null}
		</>
	);
}
