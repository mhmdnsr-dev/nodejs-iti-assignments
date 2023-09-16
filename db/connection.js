import { connect } from 'mongoose';

const initConnection = async uri => await connect(uri);

export default initConnection;
