import npDialog from "./lib/np-dialog";
import npLoading from './lib/np-loading'

const np = {};

np.dialog = new npDialog()
np.loading = new npLoading()

window.np = np;