function hexToRgbA(hex, alpha) {
  if (hex.charAt(0) === '#') {
    hex = hex.substr(1);
  }

  if (hex.length < 2 || hex.length > 6) {
    return false;
  }

  var values = hex.split(''),
    r,
    g,
    b;

  if (hex.length === 2) {
    r = parseInt(values[0].toString() + values[1].toString(), 16);
    g = r;
    b = r;
  } else if (hex.length === 3) {
    r = parseInt(values[0].toString() + values[0].toString(), 16);
    g = parseInt(values[1].toString() + values[1].toString(), 16);
    b = parseInt(values[2].toString() + values[2].toString(), 16);
  } else if (hex.length === 6) {
    r = parseInt(values[0].toString() + values[1].toString(), 16);
    g = parseInt(values[2].toString() + values[3].toString(), 16);
    b = parseInt(values[4].toString() + values[5].toString(), 16);
  } else {
    return false;
  }
  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
}

export const Colors = (alpha = 1) => {
  return {
    FirstColor: hexToRgbA('#31273c', alpha),
    SecondColor: hexToRgbA('#F1F6F7', alpha), //#dce9ea
    ThirdColor: hexToRgbA('#85466b', alpha),
    ForthColor: hexToRgbA('#8980a7', alpha),
    FifthColor: hexToRgbA('#95808A', alpha), // grey
    Dark: hexToRgbA('#000', alpha),
    White: hexToRgbA('#FFF', alpha),
    Red: hexToRgbA('#F00', alpha),
    Green: hexToRgbA('#25D366', alpha),
    Yellow: hexToRgbA('#F6CB64', alpha),
    Blue: hexToRgbA('#00F', alpha),
    Grey: hexToRgbA('#F3F3F4', alpha),
    ProjectEdit: hexToRgbA('#20B2A8', alpha),
    ProjectDelete: hexToRgbA('#E74645', alpha),
    ActiveOutlineTextInputColor: hexToRgbA('#00b4e9', alpha),
    InActiveOutLineTextInputColor: hexToRgbA('#dedede', alpha),
    TabBarColor: hexToRgbA('#dedede', alpha),
    Acknowledge: hexToRgbA('#EA8807', alpha),
    Dispatched: hexToRgbA('#CE82E0', alpha),
    Arrived: hexToRgbA('#0F24A1', alpha),
    Completed: hexToRgbA('#079E02', alpha),
    ActionDisabledButtonColor: hexToRgbA('#c4c4c4', alpha),
    loginBackgroundColor: hexToRgbA('#1f4d5d', alpha),
    headerHomeBackgroundColor: hexToRgbA('#1f4d5d', alpha),
    activeTabBackgroundColor: hexToRgbA('#3ebdb0', alpha),
    homeBackgroundColor: hexToRgbA('#f2f2f2', alpha),
    dropDownColor: hexToRgbA('#b5b5b5', alpha),
    headerTabsColor: hexToRgbA('#B2DDE4', alpha),

    pendingStatusColor: hexToRgbA('#90ee90', alpha), // assigned status
    dispatchedStatusColor: hexToRgbA('#00ADA2', alpha),
    acceptedStatusColor: hexToRgbA('#90ee90', alpha),
    successFulStatusColor: hexToRgbA('#25D366', alpha),
    inProgressStatusColor: hexToRgbA('#25D366', alpha),
    startedStatusColor: hexToRgbA('#25D366', alpha),
    declinedStatusColor: hexToRgbA('#F00', alpha),
    canceledStatusColor: hexToRgbA('#00F', alpha),
    completedStatusColor: hexToRgbA('#25D366', alpha),
    arrivedStatusColor: hexToRgbA('#00F', alpha),
    failedStatusColor: hexToRgbA('#F00', alpha),
    generalStatusColor: hexToRgbA('#D3D3D3', alpha),
    unassignedStatusColor: hexToRgbA('#F3F3F4', alpha),
    deletedStatusColor: hexToRgbA('#F00', alpha),
    HeaderBackground: hexToRgbA('#DEDEDE', alpha),
    searchBarTextColor: hexToRgbA('#b4b4b4', alpha),
  };
};

// 896
// 414
