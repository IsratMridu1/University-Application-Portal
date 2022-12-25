import React, { useState } from 'react';

const ToggleSwitch = ({defaultChecked, onChange}) => {
    // const [isToggled, setIsToggled] = useState(false);
    // const onToggle = () => setIsToggled(!isToggled);
    return (
        <label className="toggle-switch">
      {/* <input type="checkbox" checked={isToggled} onChange={onToggle} /> */}
      <input type="checkbox" defaultChecked={defaultChecked} onChange={onChange} />
      <span className="switch" />
    </label>
    );
};

export default ToggleSwitch;