import 'normalize.css';
import './styles/fonts.scss';

function requireAll(requireContext) {
  return requireContext.keys().map(requireContext);
}

requireAll(require.context('./pages', true, /\.js$/i));
