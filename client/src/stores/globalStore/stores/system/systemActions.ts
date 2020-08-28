import { SYSTEM_ERROR } from "@stores/globalStore/stores/system/systemConstants";

function setSystemError(error) {
  return {
    type: SYSTEM_ERROR,
    error,
  };
}

export { setSystemError };
