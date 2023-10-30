import { combineReducers } from '@reduxjs/toolkit';

import codeTree from './codeTreeSlice.ts';

const rootReducer = combineReducers({
  codeTree,
});

export default rootReducer;
