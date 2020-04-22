import React from "react";

import App from "./App";
import * as serviceWorker from "./serviceWorker";
import axios from "./axios-order";
import WithErrorHandler from "./hoc/WithErrorHandler";

export default WithErrorHandler(App, axios);
