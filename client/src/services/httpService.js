/**
 *
 * @param {string} url
 * @param {any} dispatch
 * @param {string} actionType
 * receives an url and a dispatch object and a action type
 * makes http Get requests and dispatches action to update the existing state based on the result of API fetch
 */
async function Get(url, dispatch, onSucessActionType, onFailureActionType) {
  try {
    let response = await fetch(url, {
      method: "GET"
    });
    if (response.status === 200) {
      let res = await response.json();
      dispatch({
        type: onSucessActionType,
        payload: { ...res }
      });
    } else {
      let res = await response.json();
      dispatch({
        type: onFailureActionType,
        payload: { error: res.error }
      });
    }
  } catch (error) {
    dispatch({
      type: onFailureActionType,
      payload: { error }
    });
  }
}

const httpService = { Get };

export default httpService;
