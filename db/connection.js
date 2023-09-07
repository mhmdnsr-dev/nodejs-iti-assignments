import { connect } from "mongoose";

const initConnection = async (uri) => {
  try {
    await connect(uri);
    console.log("Connection done");
  } catch (error) {
    console.log(error);
  }
};

export default initConnection;
