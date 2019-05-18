import React from 'react'
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

const Alert = ({ alerts }) => 
  alerts !== null && alert.length > 0 && alerts.map(alert => (
  <div key={alert.id} className={`ui alert alert-${alert.alertType}`} >
  {alert.msg}
  </div>
))

// eslint-disable-next-line react/no-typos
Alert.PropTypes = {
  alerts: PropTypes.array.isRequired,
}

const mapStateToProps = state => ({
  alerts: state.alert
});

export default connect(mapStateToProps)(Alert);
