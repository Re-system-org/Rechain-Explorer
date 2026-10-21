import $ from 'jquery'
import { appendTokenIcon } from '../../lib/token_icon'

if ($('[data-page="token-details"]').length) {
  const $tokenIconContainer = $('#token-icon')
  const chainID = $tokenIconContainer.data('chain-id')
  const addressHash = $tokenIconContainer.data('address-hash')
  const displayTokenIcons = $tokenIconContainer.data('display-token-icons')
  const iconUrl = $tokenIconContainer.data('icon-url')

  appendTokenIcon($tokenIconContainer, chainID, addressHash, displayTokenIcons, null, iconUrl)
}
