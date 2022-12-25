import React, { useEffect, useState } from "react";
import {
  Button,
  Card,
  CardBody,
  CardHeader,
  Col,
  Form,
  FormGroup,
  Input,
  Nav,
  NavItem,
  NavLink,
  TabContent,
  TabPane,
  Label,
  Row,
  Modal,
  ModalFooter,
  ModalBody,
  ModalHeader,
} from "reactstrap";
import Select from "react-select";
import { useHistory, useLocation, useParams } from "react-router-dom";
import get from "../../../helpers/get";
import { useToasts } from "react-toast-notifications";
import post from "../../../helpers/post";
import remove from "../../../helpers/remove";

import put from "../../../helpers/put";
import ButtonForFunction from "../Components/ButtonForFunction";
import loadingImages from '../../../assets/img/data.svg'
import cardImage from '../../../assets/img/Group.png';

const TestScore = () => {
  const [activetab, setActivetab] = useState("5");
  const [value, setValue] = useState(0);
  const [data, setData] = useState({});

  const {applicationStudentId, update} = useParams();

  const [greData, setGreData] = useState({});
  const [gmatData, setGmatData] = useState({});
  const [success, setSuccess] = useState(false);
  const [deleteModal, setDeleteModal] = useState(false);
  const [deleteModal2, setDeleteModal2] = useState(false);
  const [deleteModal3, setDeleteModal3] = useState(false);

  // English Course Names

  const [ielts, setIelts] = useState({});
  const [duolingo, setDuolingo] = useState({});
  const [toefl, setToefl] = useState({});
  const [functions, setFunctions] = useState({});
  const [gcse, setGcse] = useState({});
  const [pearson, setPearson] = useState({});
  const [others, setOthers] = useState({});
  const [pte, setPte] = useState({});

  const [ELqualificationLabel, setELQualificationLabel] = useState("Select");
  const [ELqualificationValue, ELsetQualificationValue] = useState(0);

  const { addToast } = useToasts();

  const [courseInfo, setCourseInfo] = useState([]);

  const [oneData, setOneData] = useState({});

  const [add, setAdd] = useState(false);

  const [updateIelts, setUpdateIelts] = useState(false);
  const [updateDuolingo, setUpdateDuolingo] = useState(false);
  const [updateToefl, setUpdateToefl] = useState(false);
  const [updateFunctions, setUpdateFunctions] = useState(false);
  const [updateGcse, setUpdateGcse] = useState(false);
  const [updatePearson, setUpdatePearson] = useState(false);
  const [updateOther, setUpdateOther] = useState(false);
  const [updatePte, setUpdatepte] = useState(false);

  const [qualificationLabel, setQualificationLabel] = useState("NO");
  const [qualificationValue, setQualificationValue] = useState(0);
  const [modalOpen, setModalOpen] = useState(false);
  const [modal2Open, setModal2Open] = useState(false);
  const [modal3Open, setModal3Open] = useState(false);


  const [testError, setTestError] = useState(false);
  const [loading, setLoading] =useState(false);
  const [buttonStatus,setButtonStatus] = useState(false);

  const handleDate = (e) => {
    var datee = e;
    var utcDate = new Date(datee);
    var localeDate = utcDate.toLocaleString("en-CA");
    const x = localeDate.split(",")[0];
    return x;
  };

  // Test Options

  const testOptions = [
    {
      id: 1,
      name: "Yes",
    },

    {
      id: 2,
      name: "No",
    },
  ];

  // Test Name Options

  const testNameOptions = [
    {
      id: 1,
      name: "IELTS",
    },

    {
      id: 2,
      name: "DUOLINGO",
    },

    {
      id: 3,
      name: "TOEFL",
    },

    {
      id: 4,
      name: "FUNCTION SKILLS",
    },

    {
      id: 5,
      name: "GCSE",
    },

    {
      id: 6,
      name: "PEARSON",
    },

    {
      id: 7,
      name: "OTHER SCORE",
    },

    {
      id: 8,
      name: "PTE SCORE",
    },
  ];

  useEffect(() => {
    get(
      `GreScore/GetbyStudent/${applicationStudentId}`
    ).then((res) => {
      console.log("fetch GRE data form API", res);
      setGreData(res);
      setLoading(false);
    });

    get(
      `GmatScore/GetByStudent/${applicationStudentId}`
    ).then((res) => {
      console.log("Fetching Gmat Score Form Api", res);
      setGmatData(res);
      setLoading(false);
    });

    get(`Ielts/Index/${applicationStudentId}`).then(
      (res) => {
        setIelts(res);
        setLoading(false);
      }
    );

    get(`Duolingo/Index/${applicationStudentId}`).then(
      (res) => {
        console.log("duolingo data", res);
        setDuolingo(res);
        setLoading(false);
      }
    );

    get(`Toefl/Index/${applicationStudentId}`).then(
      (res) => {
        setToefl(res);
        setLoading(false);
      }
    );

    get(
      `FunctionalSkill/Index/${applicationStudentId}`
    ).then((res) => {
      setFunctions(res);
      setLoading(false);
    });

    get(`Gcse/Index/${applicationStudentId}`).then(
      (res) => {
        setGcse(res);
        setLoading(false);
      }
    );

    get(`Pearson/Index/${applicationStudentId}`).then(
      (res) => {
        setPearson(res);
        setLoading(false);
      }
    );

    get(`Other/Index/${applicationStudentId}`).then(
      (res) => {
        setOthers(res);
        setLoading(false);
      }
    );

    get(`Pte/Index/${applicationStudentId}`).then(
      (res) => {
        console.log("pte Data ", res);
        setPte(res);
        setLoading(false);
      }
    );
  }, [success]);

  const backToStudentProfile = () => {
    history.push(
      `/studentProfile/${applicationStudentId}`
    );
  };

  const deleteEnglishTestScore = () => {
    if (value == 1) {
      setButtonStatus(true);
      remove(`Ielts/Delete/${data?.id}`).then((res) => {
        setButtonStatus(false);
        addToast(res, {
          appearance: "error",
          autoDismiss: true,
        });
        setData({});
        setValue(0);
        setDeleteModal(false);
        setSuccess(!success);
      });
    } else if (value == 2) {
      setButtonStatus(true);
      remove(`Duolingo/Delete/${data?.id}`).then((res) => {
        setButtonStatus(false);
        addToast(res, {
          appearance: "error",
          autoDismiss: true,
        });
        setData({});
        setValue(0);
        setDeleteModal(false);
        setSuccess(!success);
      });
    } else if (value == 3) {
      setButtonStatus(true);
      remove(`Toefl/Delete/${data?.id}`).then((res) => {
        setButtonStatus(false);
        addToast(res, {
          appearance: "error",
          autoDismiss: true,
        });
        setData({});
        setValue(0);
        setDeleteModal(false);
        setSuccess(!success);
      });
    } else if (value == 4) {
      setButtonStatus(true);
      remove(`FunctionalSkill/Delete/${data?.id}`).then((res) => {
        setButtonStatus(false);
        addToast(res, {
          appearance: "error",
          autoDismiss: true,
        });
        setData({});
        setValue(0);
        setDeleteModal(false);
        setSuccess(!success);
      });
    } else if (value == 5) {
      setButtonStatus(true);
      remove(`Gcse/Delete/${data?.id}`).then((res) => {
        setButtonStatus(false);
        addToast(res, {
          appearance: "error",
          autoDismiss: true,
        });
        setData({});
        setValue(0);
        setDeleteModal(false);
        setSuccess(!success);
      });
    } else if (value == 6) {
      setButtonStatus(true);
      remove(`Pearson/Delete/${data?.id}`).then((res) => {
        setButtonStatus(false);
        addToast(res, {
          appearance: "error",
          autoDismiss: true,
        });
        setData({});
        setValue(0);
        setDeleteModal(false);
        setSuccess(!success);
      });
    } else if (value == 7) {
      setButtonStatus(true);
      remove(`Other/Delete/${data?.id}`).then((res) => {
        setButtonStatus(false);
        addToast(res, {
          appearance: "error",
          autoDismiss: true,
        });
        setData({});
        setValue(0);
        setDeleteModal(false);
        setSuccess(!success);
      });
    } else if (value == 8) {
      setButtonStatus(true);
      remove(`Pte/Delete/${data?.id}`).then((res) => {
        setButtonStatus(false);

        addToast(res, {
          appearance: "error",
          autoDismiss: true,
        });
        setData({});
        setValue(0);
        setDeleteModal(false);
        setSuccess(!success);
      });
    }
  };

  const handleDeleteGreData = (data) => {
    setButtonStatus(true);

    remove(`GreScore/Delete/${data?.id}`).then((res) => {
      setButtonStatus(false);
      addToast(res, {
        appearance: "error",
        autoDismiss: true,
      });
      setDeleteModal2(false);
      setSuccess(!success);
    });
  };


  const addNewScore = () => {
    setQualificationLabel('Yes');
    setQualificationValue(1);
  }

  const handleDeleteGmatData = (data) => {
    setButtonStatus(true);

    remove(`GmatScore/Delete/${data?.id}`).then((res) => {
      setButtonStatus(false);
      addToast(res, {
        appearance: "error",
        autoDismiss: true,
      });
      setDeleteModal3(false);
      setSuccess(!success);
    });
  };

  // on Close Modal
  const closeModal = () => {
    setModalOpen(false);
  };

  const closeModal2 = () => {
    setModal2Open(false);
  };

  const closeModal3 = () => {
    setModal3Open(false);
  };

  const goBackward = () => {
    history.push(`/addStudentEducationalInformation/${applicationStudentId}/${1}`);
  };

  const handleForward = () => {
    history.push(`/addExperience/${applicationStudentId}`);
  };

  const toggleDanger = (info, number) => {
    console.log(info, "data");
    console.log(number, "value");
    setValue(number);
    setData(info);
    setDeleteModal(true);
  };

  const toggleDanger2 = (p) => {
    console.log(p);

    setDeleteModal2(true);
  };

  const toggleDanger3 = (p) => {
    console.log(p);

    setDeleteModal3(true);
  };

  const qualificationOptions = testNameOptions?.map((qual) => ({
    label: qual.name,
    value: qual.id,
  }));

  //  select  Student type
  const selectQualification = (label, value) => {
    setTestError(false);
    setELQualificationLabel(label);
    ELsetQualificationValue(value);

    setModalOpen(true);

    
  };

  const handleEditIelts = (data) => {
    setModalOpen(true);
    setELQualificationLabel("IELTS");
    ELsetQualificationValue(1);
    setUpdateIelts(true);
  };

  const handleEditDuolingo = (data) => {
    setModalOpen(true);
    setELQualificationLabel("DUOLINGO");
    ELsetQualificationValue(2);
    setUpdateDuolingo(true);
  };

  const handleEditToefl = (data) => {
    setModalOpen(true);
    setELQualificationLabel("TOEFL");
    ELsetQualificationValue(3);
    setUpdateToefl(true);
  };

  const handleEditFunctions = (data) => {
    setModalOpen(true);
    setELQualificationLabel("FUNCTION SKILLS");
    ELsetQualificationValue(4);
    setUpdateFunctions(true);
  };

  const handleEditGcse = (data) => {
    setModalOpen(true);
    setELQualificationLabel("GCSE");
    ELsetQualificationValue(5);
    setUpdateGcse(true);
  };

  const handleEditPearson = (data) => {
    setModalOpen(true);
    setELQualificationLabel("PEARSON");
    ELsetQualificationValue(6);
    setUpdatePearson(true);
  };

  const handleEditOthers = (data) => {
    setModalOpen(true);
    setELQualificationLabel("OTHER SCORE");
    ELsetQualificationValue(7);
    setUpdateOther(true);
  };

  const handleEditPte = (data) => {
    setModalOpen(true);
    setELQualificationLabel("PTE SCORE");
    ELsetQualificationValue(8);
    setUpdatepte(true);
  };

  const handleEdit2 = (data) => {
    setModal2Open(true);

    console.log(data);
  };

  const handleEdit3 = (data) => {
    setModal3Open(true);

    console.log(data);
  };

  const showGREForm = () => {
    setModal2Open(true);
  };

  const showGMATForm = () => {
    setModal3Open(true);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const subData = new FormData(event.target);
    if (ELqualificationLabel == "IELTS") {
      if (!updateIelts) {
        setButtonStatus(true);
        post("Ielts/Create", subData).then((res) => {
          setButtonStatus(false);
          
          if (res?.status == 200 && res?.data?.isSuccess == true) {
            addToast(res?.data?.message, {
              appearance: "success",
              autoDismiss: true,
            });
            setSuccess(!success);
            setAdd(false);
            setELQualificationLabel("Select");
            ELsetQualificationValue(0);
            setQualificationLabel("NO");
            setQualificationValue(0);
            setModalOpen(false);
          }
          else{
            addToast(res?.data?.message, {
              appearance: "error",
              autoDismiss: true,
            });
          }
        });
      } else {
        setButtonStatus(true);
        put("Ielts/Update", subData).then((res) => {
          setButtonStatus(false);
          if (res?.status == 200 && res?.data?.isSuccess == true) {
            addToast(res?.data?.message, {
              appearance: "success",
              autoDismiss: true,
            });
            setSuccess(!success);
            setAdd(false);
            setELQualificationLabel("Select");
            ELsetQualificationValue(0);
            setQualificationLabel("NO");
            setQualificationValue(0);
            setModalOpen(false);
            setUpdateIelts(false);
          }
          else{
            addToast(res?.data?.message, {
              appearance: "error",
              autoDismiss: true,
            });
          }
        });
      }
    } else if (ELqualificationLabel == "DUOLINGO") {
      if (!updateDuolingo) {
        setButtonStatus(true);
        post("Duolingo/Create", subData).then((res) => {
          setButtonStatus(false);
          if (res?.status == 200 && res?.data?.isSuccess == true) {
            addToast(res?.data?.message, {
              appearance: "success",
              autoDismiss: true,
            });
            setSuccess(!success);
            setAdd(false);
            setELQualificationLabel("Select");
            ELsetQualificationValue(0);
            setQualificationLabel("NO");
            setQualificationValue(0);
            setModalOpen(false);
          }
          else{
            addToast(res?.data?.message, {
              appearance: "error",
              autoDismiss: true,
            });
          }
        });
      } else {
        setButtonStatus(true);
        put("Duolingo/Update", subData).then((res) => {
          setButtonStatus(false);
          if (res?.status == 200 && res?.data?.isSuccess == true) {
            addToast(res?.data?.message, {
              appearance: "success",
              autoDismiss: true,
            });
            setSuccess(!success);
            setAdd(false);
            setELQualificationLabel("Select");
            ELsetQualificationValue(0);
            setQualificationLabel("NO");
            setQualificationValue(0);
            setModalOpen(false);
            setUpdateDuolingo(false);
          }
          else{
            addToast(res?.data?.message, {
              appearance: "error",
              autoDismiss: true,
            });
          }
        });
      }
    } else if (ELqualificationLabel == "TOEFL") {
      if (!updateToefl) {
        setButtonStatus(true);
        post("Toefl/Create", subData).then((res) => {
          setButtonStatus(false);
          if (res?.status == 200 && res?.data?.isSuccess == true) {
            addToast(res?.data?.message, {
              appearance: "success",
              autoDismiss: true,
            });
            setSuccess(!success);
            setAdd(false);
            setELQualificationLabel("Select");
            ELsetQualificationValue(0);
            setQualificationLabel("NO");
            setQualificationValue(0);
            setModalOpen(false);
          }
          else{
            addToast(res?.data?.message, {
              appearance: "error",
              autoDismiss: true,
            });
          }
        });
      }

      else{
        setButtonStatus(true);
        put("Toefl/Update", subData).then((res) => {
          setButtonStatus(false);
          if (res?.status == 200 && res?.data?.isSuccess == true) {
            addToast(res?.data?.message, {
              appearance: "success",
              autoDismiss: true,
            });
            setSuccess(!success);
            setAdd(false);
            setELQualificationLabel("Select");
            ELsetQualificationValue(0);
            setQualificationLabel("NO");
            setQualificationValue(0);
            setModalOpen(false);
            setUpdateToefl(false);
          }
          else{
            addToast(res?.data?.message, {
              appearance: "error",
              autoDismiss: true,
            });
          }
        });
      }
    } else if (ELqualificationLabel == "FUNCTION SKILLS") {
      if (!updateFunctions) {
        setButtonStatus(true);
        post("FunctionalSkill/Create", subData).then((res) => {
          setButtonStatus(false);
          if (res?.status == 200 && res?.data?.isSuccess == true) {
            addToast(res?.data?.message, {
              appearance: "success",
              autoDismiss: true,
            });
            setSuccess(!success);
            setAdd(false);
            setELQualificationLabel("Select");
            ELsetQualificationValue(0);
            setQualificationLabel("NO");
            setQualificationValue(0);
            setModalOpen(false);
          }
          else{
            addToast(res?.data?.message, {
              appearance: "error",
              autoDismiss: true,
            });
          }
        });
      } else {
        setButtonStatus(true);
        put("FunctionalSkill/Update", subData).then((res) => {
          setButtonStatus(false);
          if (res?.status == 200 && res?.data?.isSuccess == true) {
            addToast(res?.data?.message, {
              appearance: "success",
              autoDismiss: true,
            });
            setSuccess(!success);
            setAdd(false);
            setELQualificationLabel("Select");
            ELsetQualificationValue(0);
            setQualificationLabel("NO");
            setQualificationValue(0);
            setModalOpen(false);
            setUpdateFunctions(false);
          }
          else{
            addToast(res?.data?.message, {
              appearance: "error",
              autoDismiss: true,
            });
          }
        });
      }
    } else if (ELqualificationLabel == "GCSE") {
      if (!updateGcse) {
        setButtonStatus(true);
        post("Gcse/Create", subData).then((res) => {
          setButtonStatus(false);
          if (res?.status == 200 && res?.data?.isSuccess == true) {
            addToast(res?.data?.message, {
              appearance: "success",
              autoDismiss: true,
            });
            setSuccess(!success);
            setAdd(false);
            setELQualificationLabel("Select");
            ELsetQualificationValue(0);
            setQualificationLabel("NO");
            setQualificationValue(0);
            setModalOpen(false);
          }
          else{
            addToast(res?.data?.message, {
              appearance: "error",
              autoDismiss: true,
            });
          }
        });
      } else {
        setButtonStatus(true);
        put("Gcse/Update", subData).then((res) => {
          setButtonStatus(false);
          if (res?.status == 200 && res?.data?.isSuccess == true) {
            addToast(res?.data?.message, {
              appearance: "success",
              autoDismiss: true,
            });
            setSuccess(!success);
            setAdd(false);
            setELQualificationLabel("Select");
            ELsetQualificationValue(0);
            setQualificationLabel("NO");
            setQualificationValue(0);
            setModalOpen(false);
            setUpdateGcse(false);
          }
          else{
            addToast(res?.data?.message, {
              appearance: "error",
              autoDismiss: true,
            });
          }
        });
      }
    } else if (ELqualificationLabel == "PEARSON") {
      if (!updatePearson) {
        setButtonStatus(true);
        post("Pearson/Create", subData).then((res) => {
          setButtonStatus(false);
          if (res?.status == 200 && res?.data?.isSuccess == true) {
            addToast(res?.data?.message, {
              appearance: "success",
              autoDismiss: true,
            });
            setSuccess(!success);
            setAdd(false);
            setELQualificationLabel("Select");
            ELsetQualificationValue(0);
            setQualificationLabel("NO");
            setQualificationValue(0);
            setModalOpen(false);
          }
          else{
            addToast(res?.data?.message, {
              appearance: "error",
              autoDismiss: true,
            });
          }
        });
      } else {
        setButtonStatus(true);
        put("Pearson/Update", subData).then((res) => {
          setButtonStatus(false);
          if (res?.status == 200 && res?.data?.isSuccess == true) {
            addToast(res?.data?.message, {
              appearance: "success",
              autoDismiss: true,
            });
            setSuccess(!success);
            setAdd(false);
            setELQualificationLabel("Select");
            ELsetQualificationValue(0);
            setQualificationLabel("NO");
            setQualificationValue(0);
            setModalOpen(false);
            setUpdatePearson(false);
          }
          else{
            addToast(res?.data?.message, {
              appearance: "error",
              autoDismiss: true,
            });
          }
        });
      }
    } else if (ELqualificationLabel == "OTHER SCORE") {
      if (!updateOther) {
        setButtonStatus(true);
        post("Other/Create", subData).then((res) => {
          setButtonStatus(false);
          if (res?.status == 200 && res?.data?.isSuccess == true) {
            addToast(res?.data?.message, {
              appearance: "success",
              autoDismiss: true,
            });
            setSuccess(!success);
            setAdd(false);
            setELQualificationLabel("Select");
            ELsetQualificationValue(0);
            setQualificationLabel("NO");
            setQualificationValue(0);
            setModalOpen(false);
          }
          else{
            addToast(res?.data?.message, {
              appearance: "error",
              autoDismiss: true,
            });
          }
        });
      } else {
        setButtonStatus(true);
        put("Other/Update", subData).then((res) => {
          setButtonStatus(false);
          if (res?.status == 200 && res?.data?.isSuccess == true) {
            addToast(res?.data?.message, {
              appearance: "success",
              autoDismiss: true,
            });
            setSuccess(!success);
            setAdd(false);
            setELQualificationLabel("Select");
            ELsetQualificationValue(0);
            setQualificationLabel("NO");
            setQualificationValue(0);
            setModalOpen(false);
            setUpdateOther(false);
          }
          else{
            addToast(res?.data?.message, {
              appearance: "error",
              autoDismiss: true,
            });
          }
        });
      }
    } else {
      if (!updatePte) {
        setButtonStatus(true);
        post("PTE/Create", subData).then((res) => {
          setButtonStatus(false);
          if (res?.status == 200 && res?.data?.isSuccess == true) {
            addToast(res?.data?.message, {
              appearance: "success",
              autoDismiss: true,
            });
            setSuccess(!success);
            setAdd(false);
            setELQualificationLabel("Select");
            ELsetQualificationValue(0);
            setQualificationLabel("NO");
            setQualificationValue(0);
            setModalOpen(false);
          }
          else{
            addToast(res?.data?.message, {
              appearance: "error",
              autoDismiss: true,
            });
          }
        });
      } else {
        setButtonStatus(true);
        put("PTE/Update", subData).then((res) => {
          setButtonStatus(false);
          if (res?.status == 200 && res?.data?.isSuccess == true) {
            addToast(res?.data?.message, {
              appearance: "success",
              autoDismiss: true,
            });
            setSuccess(!success);
            setAdd(false);
            setELQualificationLabel("Select");
            ELsetQualificationValue(0);
            setQualificationLabel("NO");
            setQualificationValue(0);
            setModalOpen(false);
            setUpdatepte(false);
          }
          else{
            addToast(res?.data?.message, {
              appearance: "error",
              autoDismiss: true,
            });
          }
        });
      }
    }
  };

  console.log(qualificationLabel, qualificationValue, "dummy");

  const testSignleOptions = testOptions?.map((test) => ({
    label: test.name,
    value: test.id,
  }));

  //  select  quakification type
  const selectQualificationType = (label, value) => {
    console.log(label,value);
    setQualificationLabel(label);
    setQualificationValue(value);

    // console.log(label, value);
  };

  const history = useHistory();

  const toggle = (tab) => {
    setActivetab(tab);

    if (tab == "1") {
      history.push(`/addStudentApplicationInformation/${applicationStudentId}/${1}`);
    }

    if (tab == "2") {
      history.push(`/addStudentInformation/${applicationStudentId}/${1}`);
    }

    if (tab == "3") {
      history.push(`/addStudentContactInformation/${applicationStudentId}/${1}`);
    }

    if (tab == "4") {
      history.push(`/addStudentEducationalInformation/${applicationStudentId}/${1}`);
    }

    if (tab == "5") {
      history.push(`/addTestScore/${applicationStudentId}`);
    }

    if (tab == "6") {
      history.push(`/addExperience/${applicationStudentId}`);
    }

    if (tab == "7") {
      history.push(`/addReference/${applicationStudentId}`);
    }

    if (tab == "8") {
      history.push(`/addPersonalStatement/${applicationStudentId}`);
    }
    if (tab == "9") {
      history.push(`/addOtherInformation/${applicationStudentId}`);
    }
    if (tab == "10") {
      history.push(`/uploadDocument/${applicationStudentId}`);
    }
    if (tab == "11") {
      history.push(`/studentDeclaration/${applicationStudentId}`);
    }
  };

  // Gre data update

  const handleSubmitUpdateGre = (event) => {
    event.preventDefault();

    const subData = new FormData(event.target);

    for (var x of subData.values()) {
      console.log(x);
    }

    if (greData?.id) {
      setButtonStatus(true);
      put(`GreScore/Update`, subData).then((res) => {
        setButtonStatus(false);
        if (res?.status == 200 && res?.data?.isSuccess == true) {
          addToast(res?.data?.message, {
            appearance: "success",
            autoComplete: true,
          });
          setSuccess(!success);
          setModal2Open(false);
        }
        else{
          addToast(res?.data?.message, {
            appearance: "error",
            autoDismiss: true,
          });
        }
      });
    } else {
      setButtonStatus(true);
      post(`GreScore/Create`, subData).then((res) => {
        setButtonStatus(false);
        if (res?.status == 200 && res?.data?.isSuccess == true) {
          addToast(res?.data?.message, {
            appearance: "success",
            autoComplete: true,
          });
          setSuccess(!success);
          setModal2Open(false);
        }
        else{
          addToast(res?.data?.message, {
            appearance: "error",
            autoDismiss: true,
          });
        }
      });
    }
  };

  // GMAT data update

  const handleSubmitUpdateGmat = (event) => {
    event.preventDefault();

    const subData = new FormData(event.target);

    for (var x of subData.values()) {
      console.log(x);
    }

    if (gmatData?.id) {
      setButtonStatus(true);
      put(`GmatScore/Update`, subData).then((res) => {
        setButtonStatus(false);
        if (res?.status == 200 && res?.data?.isSuccess == true) {
          addToast(res?.data?.message, {
            appearance: "success",
            autoComplete: true,
          });
          setSuccess(!success);
          setModal3Open(false);
        }
        else{
          addToast(res?.data?.message, {
            appearance: "error",
            autoDismiss: true,
          });
        }
      });
    } else {
      setButtonStatus(true);
      post(`GmatScore/Create`, subData).then((res) => {
        setButtonStatus(false);
        if (res?.status == 200 && res?.data?.isSuccess == true) {
          addToast(res?.data?.message, {
            appearance: "success",
            autoComplete: true,
          });
          setSuccess(!success);
          setModal3Open(false);
        }
        else{
          addToast(res?.data?.message, {
            appearance: "error",
            autoDismiss: true,
          });
        }
      });
    }
  };

  

  return (
    <div>
      <Card className="uapp-card-bg">
        <CardHeader className="page-header">
          <h3 className="text-white">English Language / Test Score</h3>
          <div className="page-header-back-to-home">
            <span className="text-white" onClick={backToStudentProfile}>
              {" "}
              <i className="fas fa-arrow-circle-left"></i> Back to
              Student Profile
            </span>
          </div>
        </CardHeader>
      </Card>

     {


      loading?

      <div className="text-center">

        <img src={loadingImages} />


      </div>

      :

      <Card>
      <CardBody>
       
          <Nav tabs>
            <NavItem>
              <NavLink
              
                active={activetab === "1"}
                onClick={() => toggle("1")}
              >
                Application
              </NavLink>
            </NavItem>

            <NavItem>
              <NavLink
            
                active={activetab === "2"}
                onClick={() => toggle("2")}
              >
                Personal
              </NavLink>
            </NavItem>

            <NavItem>
              <NavLink
               
                active={activetab === "3"}
                onClick={() => toggle("3")}
              >
                Contact
              </NavLink>
            </NavItem>

            <NavItem>
              <NavLink
               
                active={activetab === "4"}
                onClick={() => toggle("4")}
              >
                Educational
              </NavLink>
            </NavItem>

            <NavItem>
              <NavLink
               
                active={activetab === "5"}
                onClick={() => toggle("5")}
              >
                Test Score
              </NavLink>
            </NavItem>

            <NavItem>
              <NavLink
               
                active={activetab === "6"}
                onClick={() => toggle("6")}
              >
                Experience
              </NavLink>
            </NavItem>

            <NavItem>
              <NavLink
               
                active={activetab === "7"}
                onClick={() => toggle("7")}
              >
                Reference
              </NavLink>
            </NavItem>

            <NavItem>
              <NavLink
              
                active={activetab === "8"}
                onClick={() => toggle("8")}
              >
                Personal Statement
              </NavLink>
            </NavItem>

            <NavItem>
              <NavLink
               
                active={activetab === "9"}
                onClick={() => toggle("9")}
              >
                Others
              </NavLink>
            </NavItem>

            <NavItem>
              <NavLink
               
                active={activetab === "10"}
                onClick={() => toggle("10")}
              >
                Documents
              </NavLink>
            </NavItem>

            <NavItem>
              <NavLink
               
                active={activetab === "11"}
                onClick={() => toggle("11")}
              >
                Declaration
              </NavLink>
            </NavItem>

          </Nav>
         
        {!(
        ielts !== null || duolingo !== null || toefl !== null || functions !== null || gcse !== null || pearson !== null || others !== null || pte !== null
        ) ? (
          <div className="container test-score-div-1-style mt-4">
            <span className="test-score-span-1-style">
              Do You Hold an English Language Qualification Such as GCSE
              English Language, IELTS, Pearson etc ?
            </span>
          </div>
        ) : null}

    
          {!(
           ielts !== null || duolingo !== null || toefl !== null || functions !== null || gcse !== null || pearson !== null || others !== null || pte !== null
          ) ? (
            <FormGroup
              row
              className="has-icon-left position-relative ml-md-2 mt-3"
            >
              <Col md="2">
                <span>
                  Please Select <span className="text-danger">*</span>{" "}
                </span>
              </Col>
              <Col md="6">
                <Select
                  options={testSignleOptions}
                  value={{
                    label: qualificationLabel,
                    value: qualificationValue,
                  }}
                  onChange={(opt) =>
                    selectQualificationType(opt.label, opt.value)
                  }
                  name=""
                  id=""
                  required
                />
              </Col>
            </FormGroup>
          ) : null}

          {qualificationLabel == "Yes" ? (
            <>
              <FormGroup
                row
                className="has-icon-left position-relative ml-md-2"
              >
                <Col md="2">
                  <span>
                    Please Select The Type Of English Language Qualification{" "}
                    <span className="text-danger">*</span>{" "}
                  </span>
                </Col>
                <Col md="6">
                  <Select
                    options={qualificationOptions}
                    value={{
                      label: ELqualificationLabel,
                      value: ELqualificationValue,
                    }}
                    onChange={(opt) =>
                      selectQualification(opt.label, opt.value)
                    }
                    name="examType"
                    id="examType"
                    required
                  />

                  {testError && (
                    <span className="text-danger">
                      Enlish language test is required{" "}
                    </span>
                  )}
                </Col>
              </FormGroup>
            </>
          ) : null}

          <br />

          <div>
            <Modal
              isOpen={modalOpen}
              toggle={closeModal}
              className="uapp-modal"
            >
              <ModalHeader>English Test Score</ModalHeader>

              <ModalBody>
                <Form onSubmit={handleSubmit}>
                  {ELqualificationLabel == "IELTS" && (
                    <>
                      <input
                        type="hidden"
                        name="studentId"
                        id="studentId"
                        value={applicationStudentId}
                      />

                      {updateIelts ? (
                        <input
                          type="hidden"
                          name="id"
                          id="id"
                          value={ielts?.id}
                        />
                      ) : null}

                      

                      <FormGroup
                        row
                        className="has-icon-left position-relative"
                      >
                        <Col md="2">
                          <span>
                            {" "}
                            Speaking
                            <span className="text-danger">*</span>{" "}
                          </span>
                        </Col>
                        <Col md="6">
                          <Input
                            type="number"
                            name="speaking"
                            id="speaking"
                            defaultValue={updateIelts ? ielts?.speaking : ""}
                            min="0"
                          />
                        </Col>
                      </FormGroup>

                      <FormGroup
                        row
                        className="has-icon-left position-relative"
                      >
                        <Col md="2">
                          <span>
                            {" "}
                            Reading
                            <span className="text-danger">*</span>{" "}
                          </span>
                        </Col>
                        <Col md="6">
                          <Input
                            type="number"
                            name="reading"
                            id="reading"
                            defaultValue={updateIelts ? ielts?.reading : ""}
                            min="0"
                          />
                        </Col>
                      </FormGroup>

                      <FormGroup
                        row
                        className="has-icon-left position-relative"
                      >
                        <Col md="2">
                          <span>
                            {" "}
                            Writing
                            <span className="text-danger">*</span>{" "}
                          </span>
                        </Col>
                        <Col md="6">
                          <Input
                            type="number"
                            name="writing"
                            id="writing"
                            defaultValue={updateIelts ? ielts?.writing : ""}
                            min="0"
                          />
                        </Col>
                      </FormGroup>

                      <FormGroup
                        row
                        className="has-icon-left position-relative"
                      >
                        <Col md="2">
                          <span>
                            {" "}
                            Listening
                            <span className="text-danger">*</span>{" "}
                          </span>
                        </Col>
                        <Col md="6">
                          <Input
                            type="number"
                            name="listening"
                            id="listening"
                            defaultValue={updateIelts ? ielts?.listening : ""}
                            min="0"
                          />
                        </Col>
                      </FormGroup>

                      <FormGroup
                        row
                        className="has-icon-left position-relative"
                      >
                        <Col md="2">
                          <span>
                            {" "}
                            Exam Date
                            <span className="text-danger">*</span>{" "}
                          </span>
                        </Col>
                        <Col md="6">
                          <Input
                            type="date"
                            name="examDate"
                            id="examDate"
                            defaultValue={
                              updateIelts ? handleDate(ielts?.examDate) : ""
                            }
                          />
                        </Col>
                      </FormGroup>

                      <FormGroup
                        row
                        className="has-icon-left position-relative"
                      >
                        <Col md="2">
                          <span>
                            {" "}
                            Overall
                            <span className="text-danger">*</span>{" "}
                          </span>
                        </Col>
                        <Col md="6">
                          <Input
                            type="number"
                            name="overall"
                            id="overall"
                            defaultValue={updateIelts ? ielts?.overall : ""}
                            min="0"
                          />
                        </Col>
                      </FormGroup>

                      <div className="row">
                        <div className="col-md-8 d-flex justify-content-end">
                        <Button
                            color="danger"
                            className="mt-3 mr-1"
                            onClick={()=> setModalOpen(false)}

                          >
                            Cancel
                            </Button>

                            <ButtonForFunction
                            name={"Save"}
                            className={" mt-3 badge-primary ml-1"}
                            type={"submit"}
                            disable={buttonStatus}
                          />

                        </div>

                      </div>
                    </>
                  )}

                  {ELqualificationLabel == "TOEFL" && (
                    <>
                      <input
                        type="hidden"
                        name="studentId"
                        id="studentId"
                        value={applicationStudentId}
                      />

                      {updateToefl ? (
                        <input
                          type="hidden"
                          name="id"
                          id="id"
                          value={toefl?.id}
                        />
                      ) : null}

                      

                      <FormGroup
                        row
                        className="has-icon-left position-relative"
                      >
                        <Col md="2">
                          <span>
                            {" "}
                            Speaking
                            <span className="text-danger">*</span>{" "}
                          </span>
                        </Col>
                        <Col md="6">
                          <Input
                            type="number"
                            name="speaking"
                            id="speaking"
                            defaultValue={updateToefl ? toefl?.speaking : ""}
                            min="0"
                          />
                        </Col>
                      </FormGroup>

                      <FormGroup
                        row
                        className="has-icon-left position-relative"
                      >
                        <Col md="2">
                          <span>
                            {" "}
                            Reading
                            <span className="text-danger">*</span>{" "}
                          </span>
                        </Col>
                        <Col md="6">
                          <Input
                            type="number"
                            name="reading"
                            id="reading"
                            defaultValue={updateToefl ? toefl?.reading : ""}
                            min="0"
                          />
                        </Col>
                      </FormGroup>

                      <FormGroup
                        row
                        className="has-icon-left position-relative"
                      >
                        <Col md="2">
                          <span>
                            {" "}
                            Writing
                            <span className="text-danger">*</span>{" "}
                          </span>
                        </Col>
                        <Col md="6">
                          <Input
                            type="number"
                            name="writing"
                            id="writing"
                            defaultValue={updateToefl ? toefl?.writing : ""}
                            min="0"
                          />
                        </Col>
                      </FormGroup>

                      <FormGroup
                        row
                        className="has-icon-left position-relative"
                      >
                        <Col md="2">
                          <span>
                            {" "}
                            Listening
                            <span className="text-danger">*</span>{" "}
                          </span>
                        </Col>
                        <Col md="6">
                          <Input
                            type="number"
                            name="listening"
                            id="listening"
                            defaultValue={updateToefl ? toefl?.listening : ""}
                            min="0"
                          />
                        </Col>
                      </FormGroup>

                      <FormGroup
                        row
                        className="has-icon-left position-relative"
                      >
                        <Col md="2">
                          <span>
                            {" "}
                            Exam Date
                            <span className="text-danger">*</span>{" "}
                          </span>
                        </Col>
                        <Col md="6">
                          <Input
                            type="date"
                            name="examDate"
                            id="examDate"
                            defaultValue={
                              updateToefl ? handleDate(toefl?.examDate) : ""
                            }
                          />
                        </Col>
                      </FormGroup>

                      <FormGroup
                        row
                        className="has-icon-left position-relative"
                      >
                        <Col md="2">
                          <span>
                            {" "}
                            Overall
                            <span className="text-danger">*</span>{" "}
                          </span>
                        </Col>
                        <Col md="6">
                          <Input
                            type="number"
                            name="overall"
                            id="overall"
                            defaultValue={updateToefl ? toefl?.overall : ""}
                            min="0"
                          />
                        </Col>
                      </FormGroup>

                      <FormGroup
                        row
                        className="has-icon-left position-relative"
                      >
                        <Col md="2">
                          <span>
                            {" "}
                            IELTS Equivalent Score
                            <span className="text-danger">*</span>{" "}
                          </span>
                        </Col>
                        <Col md="6">
                          <Input
                            type="number"
                            name="ieltsEquivalent"
                            id="ieltsEquivalent"
                            defaultValue={updateToefl ? toefl?.ieltsEquivalent : ""}
                            min="0"
                          />
                        </Col>
                      </FormGroup>

                      <div className="row">
                        <div className="col-md-8 d-flex justify-content-end">
                        <Button
                            color="danger"
                            className="mt-3 mr-1"
                            onClick={()=> setModalOpen(false)}

                          >
                            Cancel
                            </Button>

                            <ButtonForFunction
                            name={"Save"}
                            className={" mt-3 badge-primary ml-1"}
                            type={"submit"}
                            disable={buttonStatus}
                          />

                        </div>

                      </div>
                    </>
                  )}

                  {ELqualificationLabel == "FUNCTION SKILLS" && (
                    <>
                      <input
                        type="hidden"
                        name="studentId"
                        id="studentId"
                        value={applicationStudentId}
                      />

                      {updateFunctions ? (
                        <input
                          type="hidden"
                          name="id"
                          id="id"
                          value={functions?.id}
                        />
                      ) : null}

                      <FormGroup
                        row
                        className="has-icon-left position-relative"
                      >
                        <Col md="2">
                          <span>
                            {" "}
                            Overall
                            <span className="text-danger">*</span>{" "}
                          </span>
                        </Col>
                        <Col md="6">
                          <Input
                            type="number"
                            name="overall"
                            id="overall"
                            defaultValue={
                              updateFunctions ? functions?.overall : ""
                            }
                            min="0"
                          />
                        </Col>
                      </FormGroup>

                      <FormGroup
                        row
                        className="has-icon-left position-relative"
                      >
                        <Col md="2">
                          <span>
                            {" "}
                            Speaking
                            <span className="text-danger">*</span>{" "}
                          </span>
                        </Col>
                        <Col md="6">
                          <Input
                            type="number"
                            name="speaking"
                            id="speaking"
                            defaultValue={
                              updateFunctions ? functions?.speaking : ""
                            }
                            min="0"
                          />
                        </Col>
                      </FormGroup>

                      <FormGroup
                        row
                        className="has-icon-left position-relative"
                      >
                        <Col md="2">
                          <span>
                            {" "}
                            Reading
                            <span className="text-danger">*</span>{" "}
                          </span>
                        </Col>
                        <Col md="6">
                          <Input
                            type="number"
                            name="reading"
                            id="reading"
                            defaultValue={
                              updateFunctions ? functions?.reading : ""
                            }
                            min="0"
                          />
                        </Col>
                      </FormGroup>

                      <FormGroup
                        row
                        className="has-icon-left position-relative"
                      >
                        <Col md="2">
                          <span>
                            {" "}
                            Writing
                            <span className="text-danger">*</span>{" "}
                          </span>
                        </Col>
                        <Col md="6">
                          <Input
                            type="number"
                            name="writing"
                            id="writing"
                            defaultValue={
                              updateFunctions ? functions?.writing : ""
                            }
                            min="0"
                          />
                        </Col>
                      </FormGroup>

                      <FormGroup
                        row
                        className="has-icon-left position-relative"
                      >
                        <Col md="2">
                          <span>
                            {" "}
                            Listening
                            <span className="text-danger">*</span>{" "}
                          </span>
                        </Col>
                        <Col md="6">
                          <Input
                            type="number"
                            name="listening"
                            id="listening"
                            defaultValue={
                              updateFunctions ? functions?.listening : ""
                            }
                            min="0"
                          />
                        </Col>
                      </FormGroup>

                      <FormGroup
                        row
                        className="has-icon-left position-relative"
                      >
                        <Col md="2">
                          <span>
                            {" "}
                            Exam Date
                            <span className="text-danger">*</span>{" "}
                          </span>
                        </Col>
                        <Col md="6">
                          <Input
                            type="date"
                            name="examDate"
                            id="examDate"
                            defaultValue={
                              updateFunctions
                                ? handleDate(functions?.examDate)
                                : ""
                            }
                          />
                        </Col>
                      </FormGroup>

                      <FormGroup
                        row
                        className="has-icon-left position-relative"
                      >
                        <Col md="2">
                          <span>
                            {" "}
                            Overall
                            <span className="text-danger">*</span>{" "}
                          </span>
                        </Col>
                        <Col md="6">
                          <Input
                            type="number"
                            name="overall"
                            id="overall"
                            defaultValue={
                              updateFunctions ? functions?.overall : ""
                            }
                            min="0"
                          />
                        </Col>
                      </FormGroup>

                      <FormGroup
                        row
                        className="has-icon-left position-relative"
                      >
                        <Col md="2">
                          <span>
                            {" "}
                            IELTS Equivalent Score
                            <span className="text-danger">*</span>{" "}
                          </span>
                        </Col>
                        <Col md="6">
                          <Input
                            type="number"
                            name="ieltsEquivalent"
                            id="ieltsEquivalent"
                            defaultValue={
                              updateFunctions ? functions?.ieltsEquivalent : ""
                            }
                            min="0"
                          />
                        </Col>
                      </FormGroup>

                      <div className="row">
                        <div className="col-md-8 d-flex justify-content-end">
                        <Button
                            color="danger"
                            className="mt-3 mr-1"
                            onClick={()=> setModalOpen(false)}

                          >
                            Cancel
                            </Button>

                            <ButtonForFunction
                            name={"Save"}
                            className={" mt-3 badge-primary ml-1"}
                            type={"submit"}
                            disable={buttonStatus}
                          />

                        </div>

                      </div>
                    </>
                  )}

                  {ELqualificationLabel == "GCSE" && (
                    <>
                      <input
                        type="hidden"
                        name="studentId"
                        id="studentId"
                        value={applicationStudentId}
                      />

                      {updateGcse ? (
                        <input
                          type="hidden"
                          name="id"
                          id="id"
                          value={gcse?.id}
                        />
                      ) : null}

                      <FormGroup
                        row
                        className="has-icon-left position-relative"
                      >
                        <Col md="2">
                          <span>
                            {" "}
                            Result
                            <span className="text-danger">*</span>{" "}
                          </span>
                        </Col>
                        <Col md="6">
                          <Input
                            type="number"
                            name="result"
                            id="result"
                            defaultValue={updateGcse ? gcse?.result : ""}
                            min="0"
                          />
                        </Col>
                      </FormGroup>

                      <FormGroup
                        row
                        className="has-icon-left position-relative"
                      >
                        <Col md="2">
                          <span>
                            {" "}
                            IELTS Equivalent Score
                            <span className="text-danger">*</span>{" "}
                          </span>
                        </Col>
                        <Col md="6">
                          <Input
                            type="number"
                            name="ieltsEquivalent"
                            id="ieltsEquivalent"
                            defaultValue={updateGcse ? gcse?.ieltsEquivalent : ""}
                            min="0"
                          />
                        </Col>
                      </FormGroup>

                      <div className="row">
                        <div className="col-md-8 d-flex justify-content-end">
                        <Button
                            color="danger"
                            className="mt-3 mr-1"
                            onClick={()=> setModalOpen(false)}

                          >
                            Cancel
                            </Button>

                            <ButtonForFunction
                            name={"Save"}
                            className={" mt-3 badge-primary ml-1"}
                            type={"submit"}
                            disable={buttonStatus}
                          />

                        </div>

                      </div>
                    </>
                  )}

                  {ELqualificationLabel == "PEARSON" && (
                    <>
                      <input
                        type="hidden"
                        name="studentId"
                        id="studentId"
                        value={applicationStudentId}
                      />

                      {updatePearson ? (
                        <input
                          type="hidden"
                          name="id"
                          id="id"
                          value={pearson?.id}
                        />
                      ) : null}

                      <FormGroup
                        row
                        className="has-icon-left position-relative"
                      >
                        <Col md="2">
                          <span>
                            {" "}
                            Result
                            <span className="text-danger">*</span>{" "}
                          </span>
                        </Col>
                        <Col md="6">
                          <Input
                            type="number"
                            name="result"
                            id="result"
                            defaultValue={
                              updatePearson ? pearson?.result : ""
                            }
                            min="0"
                          />
                        </Col>
                      </FormGroup>

                      <FormGroup
                        row
                        className="has-icon-left position-relative"
                      >
                        <Col md="2">
                          <span>
                            {" "}
                            IELTS Equivalent Score
                            <span className="text-danger">*</span>{" "}
                          </span>
                        </Col>
                        <Col md="6">
                          <Input
                            type="number"
                            name="ieltsEquivalent"
                            id="ieltsEquivalent"
                            defaultValue={
                              updatePearson ? pearson?.ieltsEquivalent : ""
                            }
                            min="0"
                          />
                        </Col>
                      </FormGroup>

                      <div className="row">
                        <div className="col-md-8 d-flex justify-content-end">
                        <Button
                            color="danger"
                            className="mt-3 mr-1"
                            onClick={()=> setModalOpen(false)}

                          >
                            Cancel
                            </Button>

                            <ButtonForFunction
                            name={"Save"}
                            className={" mt-3 badge-primary ml-1"}
                            type={"submit"}
                            disable={buttonStatus}
                          />

                        </div>

                      </div>
                    </>
                  )}

                  {ELqualificationLabel == "DUOLINGO" && (
                    <>
                      <input
                        type="hidden"
                        name="studentId"
                        id="studentId"
                        value={applicationStudentId}
                      />

                      {updateDuolingo ? (
                        <input
                          type="hidden"
                          name="id"
                          id="id"
                          value={duolingo?.id}
                        />
                      ) : null}

                      <FormGroup
                        row
                        className="has-icon-left position-relative"
                      >
                        <Col md="3">
                          <span>
                            {" "}
                            Literacy
                            <span className="text-danger">*</span>{" "}
                          </span>
                        </Col>
                        <Col md="6">
                          <Input
                            type="number"
                            name="leteracy"
                            id="leteracy"
                            defaultValue={
                              updateDuolingo ? duolingo?.leteracy : ""
                            }
                            min="0"
                          />
                        </Col>
                      </FormGroup>

                      <FormGroup
                        row
                        className="has-icon-left position-relative"
                      >
                        <Col md="3">
                          <span>
                            {" "}
                            Comprehension
                            <span className="text-danger">*</span>{" "}
                          </span>
                        </Col>
                        <Col md="6">
                          <Input
                            type="number"
                            name="comprehension"
                            id="comprehension"
                            defaultValue={
                              updateDuolingo ? duolingo?.comprehension : ""
                            }
                            min="0"
                          />
                        </Col>
                      </FormGroup>

                      <FormGroup
                        row
                        className="has-icon-left position-relative"
                      >
                        <Col md="3">
                          <span>
                            {" "}
                            Conversation
                            <span className="text-danger">*</span>{" "}
                          </span>
                        </Col>
                        <Col md="6">
                          <Input
                            type="number"
                            name="conversation"
                            id="conversation"
                            defaultValue={
                              updateDuolingo ? duolingo?.conversation : ""
                            }
                            min="0"
                          />
                        </Col>
                      </FormGroup>

                      <FormGroup
                        row
                        className="has-icon-left position-relative"
                      >
                        <Col md="3">
                          <span>
                            {" "}
                            Production
                            <span className="text-danger">*</span>{" "}
                          </span>
                        </Col>
                        <Col md="6">
                          <Input
                            type="number"
                            name="production"
                            id="production"
                            defaultValue={
                              updateDuolingo ? duolingo?.production : ""
                            }
                            min="0"
                          />
                        </Col>
                      </FormGroup>

                      <FormGroup
                        row
                        className="has-icon-left position-relative"
                      >
                        <Col md="3">
                          <span>
                            {" "}
                            Exam Date
                            <span className="text-danger">*</span>{" "}
                          </span>
                        </Col>
                        <Col md="6">
                          <Input
                            type="date"
                            name="examDate"
                            id="examDate"
                            defaultValue={
                              updateDuolingo
                                ? handleDate(duolingo?.examDate)
                                : ""
                            }
                          />
                        </Col>
                      </FormGroup>

                      <FormGroup
                        row
                        className="has-icon-left position-relative"
                      >
                        <Col md="3">
                          <span>
                            {" "}
                            Overall
                            <span className="text-danger">*</span>{" "}
                          </span>
                        </Col>
                        <Col md="6">
                          <Input
                            type="number"
                            name="overall"
                            id="overall"
                            defaultValue={
                              updateDuolingo ? duolingo?.overall : ""
                            }
                            min="0"
                          />
                        </Col>
                      </FormGroup>

                      <FormGroup
                        row
                        className="has-icon-left position-relative"
                      >
                        <Col md="3">
                          <span>
                            {" "}
                            IELTS Equivalent Score
                            <span className="text-danger">*</span>{" "}
                          </span>
                        </Col>
                        <Col md="6">
                          <Input
                            type="number"
                            name="ieltsEquivalent"
                            id="ieltsEquivalent"
                            defaultValue={
                              updateDuolingo ? duolingo?.ieltsEquivalent : ""
                            }
                            min="0"
                          />
                        </Col>
                      </FormGroup>

                      <div className="row">
                        <div className="col-md-9 d-flex justify-content-end">
                        <Button
                            color="danger"
                            className="mt-3 mr-1"
                            onClick={()=> setModalOpen(false)}

                          >
                            Cancel
                            </Button>

                            <ButtonForFunction
                            name={"Save"}
                            className={" mt-3 badge-primary ml-1"}
                            type={"submit"}
                            disable={buttonStatus}
                          />

                        </div>

                      </div>
                    </>
                  )}

                  {ELqualificationLabel == "OTHER SCORE" && (
                    <>
                      <input
                        type="hidden"
                        name="studentId"
                        id="studentId"
                        value={applicationStudentId}
                      />

                      {updateOther ? (
                        <input
                          type="hidden"
                          name="id"
                          id="id"
                          value={others?.id}
                        />
                      ) : null}

                      <FormGroup
                        row
                        className="has-icon-left position-relative"
                      >
                        <Col md="2">
                          <span>
                            {" "}
                            Test Name
                            <span className="text-danger">*</span>{" "}
                          </span>
                        </Col>
                        <Col md="6">
                          <Input
                            type="text"
                            name="testName"
                            id="testName"
                            defaultValue={updateOther ? others?.testName : ""}
                            required
                          />
                        </Col>
                      </FormGroup>

                      <FormGroup
                        row
                        className="has-icon-left position-relative"
                      >
                        <Col md="2">
                          <span>
                            {" "}
                            Score Overall
                            <span className="text-danger">*</span>{" "}
                          </span>
                        </Col>
                        <Col md="6">
                          <Input
                            type="number"
                            name="scoreOverall"
                            id="scoreOverall"
                            defaultValue={
                              updateOther ? others?.scoreOverall : ""
                            }
                            min="0"
                          />
                        </Col>
                      </FormGroup>

                      <FormGroup
                        row
                        className="has-icon-left position-relative"
                      >
                        <Col md="2">
                          <span>
                            {" "}
                            IELTS Equivalent Score
                            <span className="text-danger">*</span>{" "}
                          </span>
                        </Col>
                        <Col md="6">
                          <Input
                            type="number"
                            name="ieltsEquivalent"
                            id="ieltsEquivalent"
                            defaultValue={
                              updateOther ? others?.ieltsEquivalent : ""
                            }
                            min="0"
                          />
                        </Col>
                      </FormGroup>

                      <div className="row">
                        <div className="col-md-8 d-flex justify-content-end">
                        <Button
                            color="danger"
                            className="mt-3 mr-1"
                            onClick={()=> setModalOpen(false)}

                          >
                            Cancel
                            </Button>

                            <ButtonForFunction
                            name={"Save"}
                            className={" mt-3 badge-primary ml-1"}
                            type={"submit"}
                            disable={buttonStatus}
                          />

                        </div>

                      </div>
                    </>
                  )}

                  {ELqualificationLabel == "PTE SCORE" && (
                    <>
                      <input
                        type="hidden"
                        name="studentId"
                        id="studentId"
                        value={applicationStudentId}
                      />

                      {updatePte ? (
                        <input
                          type="hidden"
                          name="id"
                          id="id"
                          value={pte?.id}
                        />
                      ) : null}

                     

                      <FormGroup
                        row
                        className="has-icon-left position-relative"
                      >
                        <Col md="2">
                          <span>
                            {" "}
                            Speaking
                            <span className="text-danger">*</span>{" "}
                          </span>
                        </Col>
                        <Col md="6">
                          <Input
                            type="number"
                            name="speaking"
                            id="speaking"
                            defaultValue={updatePte ? pte?.speaking : ""}
                            min="0"
                          />
                        </Col>
                      </FormGroup>

                      <FormGroup
                        row
                        className="has-icon-left position-relative"
                      >
                        <Col md="2">
                          <span>
                            {" "}
                            Reading
                            <span className="text-danger">*</span>{" "}
                          </span>
                        </Col>
                        <Col md="6">
                          <Input
                            type="number"
                            name="reading"
                            id="reading"
                            defaultValue={updatePte ? pte?.reading : ""}
                            min="0"
                          />
                        </Col>
                      </FormGroup>

                      <FormGroup
                        row
                        className="has-icon-left position-relative"
                      >
                        <Col md="2">
                          <span>
                            {" "}
                            Writing
                            <span className="text-danger">*</span>{" "}
                          </span>
                        </Col>
                        <Col md="6">
                          <Input
                            type="number"
                            name="writing"
                            id="writing"
                            defaultValue={updatePte ? pte?.writing : ""}
                            min="0"
                          />
                        </Col>
                      </FormGroup>

                      <FormGroup
                        row
                        className="has-icon-left position-relative"
                      >
                        <Col md="2">
                          <span>
                            {" "}
                            Listening
                            <span className="text-danger">*</span>{" "}
                          </span>
                        </Col>
                        <Col md="6">
                          <Input
                            type="number"
                            name="listening"
                            id="listening"
                            defaultValue={updatePte ? pte?.listening : ""}
                            min="0"
                          />
                        </Col>
                      </FormGroup>

                      <FormGroup
                        row
                        className="has-icon-left position-relative"
                      >
                        <Col md="2">
                          <span>
                            {" "}
                            Overall
                            <span className="text-danger">*</span>{" "}
                          </span>
                        </Col>
                        <Col md="6">
                          <Input
                            type="number"
                            name="overall"
                            id="overall"
                            defaultValue={updatePte ? pte?.overall : ""}
                            min="0"
                          />
                        </Col>
                      </FormGroup>

                      <FormGroup
                        row
                        className="has-icon-left position-relative"
                      >
                        <Col md="2">
                          <span>
                            {" "}
                            IELTS Equivalent Score
                            <span className="text-danger">*</span>{" "}
                          </span>
                        </Col>
                        <Col md="6">
                          <Input
                            type="number"
                            name="ieltsEquivalent"
                            id="ieltsEquivalent"
                            defaultValue={updatePte ? pte?.ieltsEquivalent : ""}
                            min="0"
                          />
                        </Col>
                      </FormGroup>

                      <div className="row">
                        <div className="col-md-8 d-flex justify-content-end">
                        <Button
                            color="danger"
                            className="mt-3 mr-1"
                            onClick={()=> setModalOpen(false)}

                          >
                            Cancel
                            </Button>

                            <ButtonForFunction
                            name={"Save"}
                            className={" mt-3 badge-primary ml-1"}
                            type={"submit"}
                            disable={buttonStatus}
                          />

                        </div>

                      </div>
                    </>
                  )}
                </Form>
              </ModalBody>
            </Modal>
          </div>

          {/* Showing English Test Score Forms */}


        {/* Showing English Test Result In Card */}

        
          <div className="hedding-titel ml-md-2 mb-3">
            <div>
              <h5>
                {" "}
                <b>English Test Score</b>{" "}
              </h5>

              <div className="bg-h"></div>
            </div>
          </div>

         {
          (ielts !== null || duolingo !== null || toefl !== null || functions !== null || gcse !== null || pearson !== null || others !== null || pte !== null) ?
           <div className="ml-md-2 mb-2">
            
           <ButtonForFunction className ={"btn btn-uapp-add "}
                icon ={<i className="fas fa-plus"></i>}
                func={addNewScore} 
                name={' Add New English Test Score'}
                
                ></ButtonForFunction>
           </div>

           :

           null
         }
         <div className="row mt-3">

          {ielts?.id ? (
            
            <div className="col-md-6 mt-2" style={{ textAlign: "left" }}>
              <Card className="CampusCard test-score-card-style">
                <CardBody className="shadow">
                  <div className="d-flex justify-content-space-between">
                    <h5 className="test-score-title-style">IELTS Score</h5>
                    <div className="CampusCardAction">
                      <div className="">
                        <Button
                          type="button"
                          color="primary"
                          className="bankCard-style"
                          onClick={handleEditIelts}
                        >
                          {" "}
                          <i className="fas fa-edit"></i>{" "}
                        </Button>
                      </div>

                      <div className="">
                        <Button
                          type="button"
                          color="danger"
                          className="bankCard-style"
                          onClick={() => toggleDanger(ielts, 1)}
                        >
                          <i className="fas fa-trash-alt"></i>
                        </Button>
                      </div>
                    </div>
                  </div>

             <div className="d-flex justify-content-between">

              <div>
              <span className='bank-account-info-text'>Overall: {ielts?.overall}</span>
                  <br/>
                  <span className='bank-account-info-text'>Speaking: {ielts?.speaking}</span>
                  <br/>
                  <span className='bank-account-info-text'>reading: {ielts?.reading}</span>
                  <br/>
                  <span className='bank-account-info-text'>Writing: {ielts?.writing}</span>
                  <br/>
                  <span className='bank-account-info-text'>Listening: {ielts?.listening}</span>
                  <br/>
                  <span className='bank-account-info-text'>Exam Date: {handleDate(ielts?.examDate)}</span>

                  

              </div>

              <div>

              <img src={cardImage} />

              </div>

             </div>
                </CardBody>

                <Modal
                  isOpen={deleteModal}
                  toggle={() => setDeleteModal(!deleteModal)}
                  className="uapp-modal"
                >
                  <ModalBody>
                    <p>
                      Are You Sure to Delete this ? Once Deleted it can't be
                      Undone!
                    </p>
                  </ModalBody>

                  <ModalFooter>
                    <Button color="danger" onClick={deleteEnglishTestScore} disabled={buttonStatus}>
                      YES
                    </Button>
                    <Button onClick={() => setDeleteModal(false)}>NO</Button>
                  </ModalFooter>
                </Modal>
              </Card>
            </div>
          ) : null}

          {duolingo?.id ? (
            <div className="col-md-6 mt-2" style={{ textAlign: "left" }}>
              <Card className="CampusCard test-score-card-style">
                <CardBody className="shadow">
                  <div className="d-flex justify-content-space-between">
                    <h5 className="test-score-title-style">DUOLINGO Score</h5>
                    <div className="CampusCardAction">
                      <div className="">
                        <Button
                          type="button"
                          className="bankCard-style"
                          color="primary"
                          onClick={handleEditDuolingo}
                        >
                          {" "}
                          <i className="fas fa-edit"></i>{" "}
                        </Button>
                      </div>

                      <div className="">
                        <Button
                          type="button"
                          color='danger'
                          className="bankCard-style"
                          onClick={() => toggleDanger(duolingo, 2)}
                        >
                          <i className="fas fa-trash-alt"></i>
                        </Button>
                      </div>
                    </div>
                  </div>

                  <div className="d-flex justify-content-between">
                    <div>
                    <span  className='bank-account-info-text'>Literacy: {duolingo?.leteracy}</span>
                  <br/>
                  <span  className='bank-account-info-text'>Comprehension: {duolingo?.comprehension}</span>
                  <br/>
                  <span  className='bank-account-info-text'>Conversation: {duolingo?.conversation}</span>
                  <br/>
                  <span  className='bank-account-info-text'>Production: {duolingo?.production}</span>
                  <br/>
                  <span  className='bank-account-info-text'>Exam Date: {handleDate(duolingo?.examDate)}</span>
                  <br/>
                  <span  className='bank-account-info-text'>IELTS Equivalent Score: {duolingo?.ieltsEquivalent}</span>
                    </div>

                    <div>
                      <img src={cardImage} />
                    </div>

                  </div>
                </CardBody>

                <Modal
                  isOpen={deleteModal}
                  toggle={() => setDeleteModal(!deleteModal)}
                  className="uapp-modal"
                >
                  <ModalBody>
                    <p>
                      Are You Sure to Delete this ? Once Deleted it can't be
                      Undone!
                    </p>
                  </ModalBody>

                  <ModalFooter>
                    <Button color="danger" onClick={deleteEnglishTestScore} disabled={buttonStatus}>
                      YES
                    </Button>
                    <Button onClick={() => setDeleteModal(false)}>NO</Button>
                  </ModalFooter>
                </Modal>
              </Card>
            </div>
          ) : null}

          {toefl?.id ? (
            <div className="col-md-6 mt-2" style={{ textAlign: "left" }}>
              <Card className="CampusCard test-score-card-style">
                <CardBody className="shadow">
                  <div className="d-flex justify-content-space-between">
                    <h5 className="test-score-title-style">TOEFL Score</h5>
                    <div className="CampusCardAction">
                      <div className="">
                        <Button
                          type="button"
                          color="primary"
                          className="bankCard-style"
                          onClick={handleEditToefl}
                        >
                          {" "}
                          <i className="fas fa-edit"></i>{" "}
                        </Button>
                      </div>

                      <div className="">
                        <Button
                          type="button"
                          color="danger"
                          className="bankCard-style"
                          onClick={() => toggleDanger(toefl, 3)}
                        >
                          <i className="fas fa-trash-alt"></i>
                        </Button>
                      </div>
                    </div>
                  </div>

                  <div className="d-flex justify-content-between">

                    <div>

                    <span className="bank-account-info-text">Overall: {toefl?.overall}</span>
                  <br/>
                  <span  className="bank-account-info-text">Speaking: {toefl?.speaking}</span>
                  <br/>
                  <span  className="bank-account-info-text">reading: {toefl?.reading}</span>
                  <br/>
                  <span  className="bank-account-info-text">Writing: {toefl?.writing}</span>
                  <br/>
                  <span  className="bank-account-info-text">Listening: {toefl?.listening}</span>
                  <br/>
                  <span  className="bank-account-info-text">Exam Date: {handleDate(toefl?.examDate)}</span>
                  <br/>
                  <span  className="bank-account-info-text">IELTS Equivalent Score: {toefl?.ieltsEquivalent}</span>

                    </div>

                    <div>
                      <img src={cardImage} />

                    </div>

                  </div>
                </CardBody>

                <Modal
                  isOpen={deleteModal}
                  toggle={() => setDeleteModal(!deleteModal)}
                  className="uapp-modal"
                >
                  <ModalBody>
                    <p>
                      Are You Sure to Delete this ? Once Deleted it can't be
                      Undone!
                    </p>
                  </ModalBody>

                  <ModalFooter>
                    <Button color="danger" onClick={deleteEnglishTestScore} disabled={buttonStatus}>
                      YES
                    </Button>
                    <Button onClick={() => setDeleteModal(false)}>NO</Button>
                  </ModalFooter>
                </Modal>
              </Card>
            </div>
          ) : null}
          {functions?.id ? (
            <div className="col-md-6 mt-2" style={{ textAlign: "left" }}>
              <Card className="CampusCard shadow-style test-score-card-style">
                <CardBody className="shadow">
                  <div className="d-flex justify-content-space-between">
                    <h5 className="test-score-title-style">Functional Skill Score</h5>
                    <div className="CampusCardAction">
                      <div className="">
                        <Button
                          type="button"
                          className="bankCard-style"
                          color="primary"
                          onClick={handleEditFunctions}
                        >
                          {" "}
                          <i className="fas fa-edit"></i>{" "}
                        </Button>
                      </div>

                      <div className="">
                        <Button
                          type="button"
                          className="bankCard-style"
                          color="danger"
                          onClick={() => toggleDanger(functions, 4)}
                        >
                          <i className="fas fa-trash-alt"></i>
                        </Button>
                      </div>
                    </div>
                  </div>

                 <div className="d-flex justify-content-between">
                  <div>
                  <span className="bank-account-info-text">Overall: {functions?.overall}</span>
                  <br/>
                  <span className="bank-account-info-text">Speaking: {functions?.speaking}</span>
                  <br/>
                  <span className="bank-account-info-text">reading: {functions?.reading}</span>
                  <br/>
                  <span className="bank-account-info-text">Writing: {functions?.writing}</span>
                  <br/>
                  <span className="bank-account-info-text">Listening: {functions?.listening}</span>
                  <br/>
                  <span className="bank-account-info-text">Exam Date: {handleDate(functions?.examDate)}</span>
                  <br/>
                  <span className="bank-account-info-text">IELTS Equivalent Score: {functions?.ieltsEquivalent}</span>
                  </div>

                  <div>
                    <img src={cardImage} />

                  </div>



                 </div>

                </CardBody>

                <Modal
                  isOpen={deleteModal}
                  toggle={() => setDeleteModal(!deleteModal)}
                  className="uapp-modal"
                >
                  <ModalBody>
                    <p>
                      Are You Sure to Delete this ? Once Deleted it can't be
                      Undone!
                    </p>
                  </ModalBody>

                  <ModalFooter>
                    <Button color="danger" onClick={deleteEnglishTestScore} disabled={buttonStatus}>
                      YES
                    </Button>
                    <Button onClick={() => setDeleteModal(false)}>NO</Button>
                  </ModalFooter>
                </Modal>
              </Card>
            </div>
          ) : null}

          {gcse?.id ? (
            <div className="col-md-6 mt-2" style={{ textAlign: "left" }}>
              <Card className="CampusCard shadow-style test-score-card-style">
                <CardBody className="shadow">
                  <div className="d-flex justify-content-space-between">
                    <h5 className="test-score-title-style">GCSE Score</h5>
                    <div className="CampusCardAction">
                      <div className="">
                        <Button
                          type="button"
                          color="primary"
                          className="bankCard-style"
                          onClick={handleEditGcse}
                        >
                          {" "}
                          <i className="fas fa-edit"></i>{" "}
                        </Button>
                      </div>

                      <div className="">
                        <Button
                          type="button"
                          color="danger"
                          className="bankCard-style"
                          onClick={() => toggleDanger(gcse, 5)}
                        >
                          <i className="fas fa-trash-alt"></i>
                        </Button>
                      </div>
                    </div>
                  </div>

                 <div className="d-flex justify-content-between">
                  <div>
                  <span className="bank-account-info-text">Result: {gcse?.result}</span>
                  <br/>
                  <span className="bank-account-info-text">IELTS Equivalent Score: {gcse?.ieltsEquivalent}</span>
                  </div>
                  <div>
                    <img src={cardImage} />
                  </div>

                 </div>

                </CardBody>

                <Modal
                  isOpen={deleteModal}
                  toggle={() => setDeleteModal(!deleteModal)}
                  className="uapp-modal"
                >
                  <ModalBody>
                    <p>
                      Are You Sure to Delete this ? Once Deleted it can't be
                      Undone!
                    </p>
                  </ModalBody>

                  <ModalFooter>
                    <Button color="danger" onClick={deleteEnglishTestScore} disabled={buttonStatus}>
                      YES
                    </Button>
                    <Button onClick={() => setDeleteModal(false)}>NO</Button>
                  </ModalFooter>
                </Modal>
              </Card>
            </div>
          ) : null}

          {pearson?.id ? (
            <div className="col-md-6 mt-2" style={{ textAlign: "left" }}>
              <Card className="CampusCard shadow-style test-score-card-style">
                <CardBody className="shadow">
                  <div className="d-flex justify-content-space-between">
                    <h5 className="test-score-title-style">PEARSON Score</h5>
                    <div className="CampusCardAction">
                      <div className="">
                        <Button
                          type="Button"
                          color="primary"
                          className="bankCard-style"
                          onClick={handleEditPearson}
                        >
                          {" "}
                          <i className="fas fa-edit"></i>{" "}
                        </Button>
                      </div>

                      <div className="">
                        <Button
                          type="button"
                          color="danger"
                          className="bankCard-style"
                          onClick={() => toggleDanger(pearson, 6)}
                        >
                          <i className="fas fa-trash-alt"></i>
                        </Button>
                      </div>
                    </div>
                  </div>

                 <div className="d-flex justify-content-between">
                  <div>
                  <span className="bank-account-info-text">Result: {pearson?.result}</span>
                  <br/>
                  <span className="bank-account-info-text">IELTS Equivalent Score: {pearson?.ieltsEquivalent}</span>
                  </div>

                  <div>

                    <img src={cardImage} />
                  </div>

                 </div>
                </CardBody>

                <Modal
                  isOpen={deleteModal}
                  toggle={() => setDeleteModal(!deleteModal)}
                  className="uapp-modal"
                >
                  <ModalBody>
                    <p>
                      Are You Sure to Delete this ? Once Deleted it can't be
                      Undone!
                    </p>
                  </ModalBody>

                  <ModalFooter>
                    <Button color="danger" onClick={deleteEnglishTestScore} disabled={buttonStatus}>
                      YES
                    </Button>
                    <Button onClick={() => setDeleteModal(false)}>NO</Button>
                  </ModalFooter>
                </Modal>
              </Card>
            </div>
          ) : null}

          {others?.id ? (
            <div className="col-md-6 mt-2" style={{ textAlign: "left" }}>
              <Card className="CampusCard shadow-style test-score-card-style">
                <CardBody className="shadow">
                  <div className="d-flex justify-content-space-between">
                    <h5 className="test-score-title-style">Other Score</h5>
                    <div className="CampusCardAction">
                      <div className="">
                        <Button
                          type="button"
                          color="primary"
                          className="bankCard-style"
                          onClick={handleEditOthers}
                        >
                          {" "}
                          <i className="fas fa-edit"></i>{" "}
                        </Button>
                      </div>

                      <div className="">
                        <Button
                          type="button"
                          color="danger"
                          className="bankCard-style"
                          onClick={() => toggleDanger(others, 7)}
                        >
                          <i className="fas fa-trash-alt"></i>
                        </Button>
                      </div>
                    </div>
                  </div>

                <div className="d-flex justify-content-between">
                  <div>
                  <span className="bank-account-info-text">Test Name: {others?.testName}</span>
                  <br/>
                  <span className="bank-account-info-text">Overall Score: {others?.scoreOverall}</span>
                  <br/>
                  <span className="bank-account-info-text">IELTS Equivalent Score: {others?.ieltsEquivalent}</span>
                  </div>

                  <div>
                  <img src={cardImage} />
                </div>


                </div>
                
                </CardBody>

                <Modal
                  isOpen={deleteModal}
                  toggle={() => setDeleteModal(!deleteModal)}
                  className="uapp-modal"
                >
                  <ModalBody>
                    <p>
                      Are You Sure to Delete this ? Once Deleted it can't be
                      Undone!
                    </p>
                  </ModalBody>

                  <ModalFooter>
                    <Button color="danger" onClick={deleteEnglishTestScore} disabled={buttonStatus}>
                      YES
                    </Button>
                    <Button onClick={() => setDeleteModal(false)}>NO</Button>
                  </ModalFooter>
                </Modal>
              </Card>
            </div>
          ) : null}
          {pte?.id ? (
            <div className="col-md-6 mt-2" style={{ textAlign: "left" }}>
              <Card className="CampusCard shadow-style test-score-card-style">
                <CardBody className="shadow">
                  <div className="d-flex justify-content-space-between">
                    <h5 className="test-score-title-style">PTE Score</h5>
                    <div className="CampusCardAction">
                      <div className="">
                        <Button
                          type="button"
                          color="primary"
                          className="bankCard-style"
                          onClick={handleEditPte}
                        >
                          {" "}
                          <i className="fas fa-edit"></i>{" "}
                        </Button>
                      </div>

                      <div className="">
                        <Button
                          type="Button"
                          color="danger"
                          className="bankCard-style"
                          onClick={() => toggleDanger(pte, 8)}
                        >
                          <i className="fas fa-trash-alt"></i>
                        </Button>
                      </div>
                    </div>
                  </div>

                  <div className="d-flex justify-content-between">

                    <div>
                    <span className="bank-account-info-text">Overall: {pte?.overall}</span>
                  <br/>
                  <span className="bank-account-info-text">Speaking: {pte?.speaking}</span>
                  <br/>
                  <span className="bank-account-info-text">Reading: {pte?.reading}</span>
                  <br/>
                  <span className="bank-account-info-text">Writing: {pte?.writing}</span>
                  <br/>
                  <span className="bank-account-info-text">Listening: {pte?.listening}</span>
                  <br/>
                  <span className="bank-account-info-text">IELTS Equivalent Score: {pte?.ieltsEquivalent}</span>
                    </div>

                    <div>
                      <img src={cardImage} />
                    </div>

                  </div>
                  
                </CardBody>

                <Modal
                  isOpen={deleteModal}
                  toggle={() => setDeleteModal(!deleteModal)}
                  className="uapp-modal"
                >
                  <ModalBody>
                    <p>
                      Are You Sure to Delete this ? Once Deleted it can't be
                      Undone!
                    </p>
                  </ModalBody>

                  <ModalFooter>
                    <Button color="danger" onClick={deleteEnglishTestScore} disabled={buttonStatus}>
                      YES
                    </Button>
                    <Button onClick={() => setDeleteModal(false)}>NO</Button>
                  </ModalFooter>
                </Modal>
              </Card>
            </div>
          ) : null}
        </div>

        <section id="root">
          
            <div className="hedding-titel ml-md-2 mb-3">
              <div>
                <h5>
                  {" "}
                  <b>GRE & GMAT Score</b>{" "}
                </h5>

                <div className="bg-h"></div>
              </div>
            </div>
            <div className="row mt-3">
            {greData?.id ? (
              <div className="col-md-6 mt-2" style={{ textAlign: "left" }}>
                <Card className="CampusCard shadow-style test-score-card-style">
                  <CardBody className="shadow">
                    <div className="d-flex justify-content-space-between">
                  <div>
                  <span className="bank-account-info-text">Exam Date: {handleDate(greData?.greExamDate)}</span>
                      <h5 className="test-score-title-style">GRE Result</h5>
                  </div>
                      <div className="CampusCardAction">
                        <div className="">
                          <Button
                            type="button"
                            onClick={() => handleEdit2(greData)}
                            color='primary'
                            className="bankCard-style"
                          >
                            {" "}
                            <i className="fas fa-edit"></i>{" "}
                          </Button>
                        </div>

                        <div className="">
                          <Button
                            type="button"
                            className="bankCard-style"
                            color="danger"
                            onClick={() => toggleDanger2(greData)}
                          >
                            <i className="fas fa-trash-alt"></i>
                          </Button>
                        </div>
                      </div>
                    </div>

                    <div className="d-flex justify-content-between">

                      <div>
                      <span className="bank-account-info-text">Quantitative Score: {greData?.quantitativeScore}</span>
                      <br/>
                    <span className="bank-account-info-text">Quantitative Rank: {greData?.quantitativeRank}</span>
                    <br/>
                    <span className="bank-account-info-text">Verbal Score: {greData?.verbalScore}</span>
                    <br/>
                    <span className="bank-account-info-text">Verbal Rank: {greData?.verbalRank}</span>
                    <br/>
                    <span className="bank-account-info-text">Writing Score: {greData?.writingScore}</span>
                    <br/>
                    <span className="bank-account-info-text">Writing Rank: {greData?.writingRank}</span>
                    <br/>
                   

                      </div>

                      <div>
                        <img src={cardImage} />

                      </div>
                    </div>
                  </CardBody>

                  <Modal
                    isOpen={deleteModal2}
                    toggle={() => setDeleteModal2(!deleteModal2)}
                    className="uapp-modal"
                  >
                    <ModalBody>
                      <p>
                        Are You Sure to Delete this ? Once Deleted it can't be
                        Undone!
                      </p>
                    </ModalBody>

                    <ModalFooter>
                      <Button
                        color="danger"
                        onClick={() => handleDeleteGreData(greData)}
                        disabled={buttonStatus}                       >
                        YES
                      </Button>
                      <Button onClick={() => setDeleteModal2(false)}>
                        NO
                      </Button>
                    </ModalFooter>
                  </Modal>
                </Card>
              </div>
            ) : null}

            {gmatData?.id ? (
              <div className="col-md-6 mt-2" style={{ textAlign: "left" }}>
                <Card className="CampusCard shadow-style test-score-card-style">
                  <CardBody className="shadow">
                    <div className="d-flex justify-content-space-between">
                    <div>
                    <span className="bank-account-info-text">Exam Date: {handleDate(gmatData?.gmatExamDate)}</span>
                      <h5 className="test-score-title-style">GMAT Result</h5>
                    </div>
                      <div className="CampusCardAction">
                        <div className="">
                          <Button
                            type="button"
                            onClick={() => handleEdit3(gmatData)}
                            className="bankCard-style"
                            color="primary"
                          >
                            {" "}
                            <i className="fas fa-edit"></i>{" "}
                          </Button>
                        </div>

                        <div className="">
                          <Button
                            type="button"
                            color="danger"
                            className="bankCard-style"
                            onClick={() => toggleDanger3(gmatData)}
                          >
                            <i className="fas fa-trash-alt"></i>
                          </Button>
                        </div>
                      </div>
                    </div>

                   <div className="d-flex justify-content-between">

                    <div>
                    <span className="bank-account-info-text">Quantitative Score: {gmatData?.quantitativeScore}</span>
                    <br/>
                    <span className="bank-account-info-text">Quantitative Rank: {gmatData?.quantitativeRank}</span>
                    <br/>
                    <span className="bank-account-info-text">Verbal Score: {gmatData?.verbalScore}</span>
                    <br/>
                    <span className="bank-account-info-text">Verbal Rank: {gmatData?.verbalRank}</span>
                    <br/>
                    <span className="bank-account-info-text">Total Score: {gmatData?.totalScore}</span>
                    <br/>
                    <span className="bank-account-info-text">Total Rank: {gmatData?.totalRank}</span>
                    <br/>
                    <span className="bank-account-info-text">Writing Score: {gmatData?.writingScore}</span>
                    <br/>
                    <span className="bank-account-info-text">Writing Rank: {gmatData?.writingRank}</span>
                    <br/>
                    

                    </div>
                    <div>
                      <img src={cardImage} />
                    </div>

                   </div>
                  </CardBody>

                  <Modal
                    isOpen={deleteModal3}
                    toggle={() => setDeleteModal3(!deleteModal3)}
                    className="uapp-modal"
                  >
                    <ModalBody>
                      <p>
                        Are You Sure to Delete this ? Once Deleted it can't be
                        Undone!
                      </p>
                    </ModalBody>

                    <ModalFooter>
                      <Button
                        color="danger"
                        onClick={() => handleDeleteGmatData(gmatData)}
                        disabled={buttonStatus} >
                        YES
                      </Button>
                      <Button onClick={() => setDeleteModal3(false)}>
                        NO
                      </Button>
                    </ModalFooter>
                  </Modal>
                </Card>
              </div>
            ) : null}
          </div>
        </section>

        {!greData?.id ? (
          <>
            <div className="container test-score-div-1-style mt-4">
              <span className="test-score-span-1-style">
                GRE Information Not Found. Add Gre Information.
              </span>
            </div>

            <FormGroup
              className="has-icon-left position-relative"
              style={{ display: "flex", justifyContent: "space-between" }}
            >
              <Button.Ripple
                color="primary"
                onClick={showGREForm}
                className="ms-md-2 mt-3"
              >
                Add GRE
              </Button.Ripple>
            </FormGroup>
          </>
        ) : null}

        {gmatData?.id ? null : (
          <>
            <div className="container test-score-div-1-style mt-4">
              <span className="test-score-span-1-style">
                GMAT Information Not Found. Add GMAT Information.
              </span>
            </div>

            <FormGroup
              className="has-icon-left position-relative"
              style={{ display: "flex", justifyContent: "space-between" }}
            >
              <Button.Ripple
                color="primary"
                onClick={showGMATForm}
                className="ms-md-2 mt-3"
              >
                Add GMAT
              </Button.Ripple>
            </FormGroup>
          </>
        )}

        {/* MOdals Start Section */}

        <TabContent activeTab={activetab}>
          <TabPane tabId="5">
            <div>
              <Modal
                isOpen={modal2Open}
                toggle={closeModal2}
                className="uapp-modal2"
              >
                {greData?.id ? (
                  <ModalHeader>Update GRE Result</ModalHeader>
                ) : (
                  <ModalHeader>Add GRE Result</ModalHeader>
                )}
                <ModalBody>
                  <Form onSubmit={handleSubmitUpdateGre}>
                    <Input
                      type="hidden"
                      name="studentId"
                      id="studentId"
                      value={applicationStudentId}
                    />

                    {greData?.id ? (
                      <Input
                        type="hidden"
                        name="id"
                        id="id"
                        value={greData?.id}
                      />
                    ) : null}

                    <input
                      type="hidden"
                      name="haveGreExam"
                      id="haveGreExam"
                      checked={true}
                    />

                    <FormGroup
                      row
                      className="has-icon-left position-relative"
                    >
                      <Col md="5">
                        <span>
                          GRE Exam Date <span className="text-danger">*</span>{" "}
                        </span>
                      </Col>
                      <Col md="6">
                        <Input
                          type="date"
                          id="greExamDate"
                          name="greExamDate"
                          defaultValue={handleDate(greData?.greExamDate)}
                        />
                      </Col>
                    </FormGroup>

                    <FormGroup
                      row
                      className="has-icon-left position-relative"
                    >
                      <Col md="5">
                        <span>
                          Verbal Score <span className="text-danger">*</span>{" "}
                        </span>
                      </Col>
                      <Col md="6">
                        <Input
                          type="text"
                          id="verbalScore"
                          name="verbalScore"
                          required
                          defaultValue={greData?.verbalScore}
                        />
                      </Col>
                    </FormGroup>

                    <FormGroup
                      row
                      className="has-icon-left position-relative"
                    >
                      <Col md="5">
                        <span>
                          Verbal Rank <span className="text-danger">*</span>{" "}
                        </span>
                      </Col>
                      <Col md="6">
                        <Input
                          type="text"
                          id="verbalRank"
                          name="verbalRank"
                          required
                          defaultValue={greData?.verbalRank}
                        />
                      </Col>
                    </FormGroup>

                    <FormGroup
                      row
                      className="has-icon-left position-relative"
                    >
                      <Col md="5">
                        <span>
                          Quantitative Score{" "}
                          <span className="text-danger">*</span>{" "}
                        </span>
                      </Col>
                      <Col md="6">
                        <Input
                          type="text"
                          id="quantitativeScore"
                          name="quantitativeScore"
                          required
                          defaultValue={greData?.quantitativeScore}
                        />
                      </Col>
                    </FormGroup>

                    <FormGroup
                      row
                      className="has-icon-left position-relative"
                    >
                      <Col md="5">
                        <span>
                          Quantitative Rank{" "}
                          <span className="text-danger">*</span>{" "}
                        </span>
                      </Col>
                      <Col md="6">
                        <Input
                          type="text"
                          id="quantitativeRank"
                          name="quantitativeRank"
                          required
                          defaultValue={greData?.quantitativeRank}
                        />
                      </Col>
                    </FormGroup>

                    <FormGroup
                      row
                      className="has-icon-left position-relative"
                    >
                      <Col md="5">
                        <span>
                          Writing Score <span className="text-danger">*</span>{" "}
                        </span>
                      </Col>
                      <Col md="6">
                        <Input
                          type="text"
                          id="writingScore"
                          name="writingScore"
                          required
                          defaultValue={greData?.writingScore}
                        />
                      </Col>
                    </FormGroup>

                    <FormGroup
                      row
                      className="has-icon-left position-relative"
                    >
                      <Col md="5">
                        <span>
                          Writing Rank <span className="text-danger">*</span>{" "}
                        </span>
                      </Col>
                      <Col md="6">
                        <Input
                          type="text"
                          id="writingRank"
                          name="writingRank"
                          required
                          defaultValue={greData?.writingRank}
                        />
                      </Col>
                    </FormGroup>

                    <FormGroup
                      className="has-icon-left position-relative"
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                      }}
                    >
                      <Button
                        color="danger"
                        className="mr-1 mt-3"
                        onClick={closeModal2}
                      >
                        Cancel
                      </Button>

                      <Button
                        color="primary"
                        type="submit"
                        className="mr-1 mt-3"
                        disabled={buttonStatus}
                      >
                        Submit
                      </Button>
                    </FormGroup>
                  </Form>
                </ModalBody>
              </Modal>
              <div></div>
            </div>

            <div>
              <Modal
                isOpen={modal3Open}
                toggle={closeModal3}
                className="uapp-modal2"
              >
                {gmatData?.id ? (
                  <ModalHeader>Update GMAT Result</ModalHeader>
                ) : (
                  <ModalHeader>Add GMAT Result</ModalHeader>
                )}
                <ModalBody>
                  <Form onSubmit={handleSubmitUpdateGmat}>
                    <Input
                      type="hidden"
                      name="studentId"
                      id="studentId"
                      value={applicationStudentId}
                    />

                    {gmatData?.id ? (
                      <Input
                        type="hidden"
                        name="id"
                        id="id"
                        value={gmatData?.id}
                      />
                    ) : null}

                    <FormGroup
                      row
                      className="has-icon-left position-relative"
                    >
                      <Input
                        type="hidden"
                        name="haveGmatExam"
                        id="haveGmatExam"
                        value={true}
                      />
                    </FormGroup>

                    <FormGroup
                      row
                      className="has-icon-left position-relative"
                    >
                      <Col md="5">
                        <span>
                          GMAT Exam Date{" "}
                          <span className="text-danger">*</span>{" "}
                        </span>
                      </Col>
                      <Col md="6">
                        <Input
                          type="date"
                          id="gmatExamDate"
                          name="gmatExamDate"
                          defaultValue={handleDate(gmatData?.gmatExamDate)}
                        />
                      </Col>
                    </FormGroup>

                    <FormGroup
                      row
                      className="has-icon-left position-relative"
                    >
                      <Col md="5">
                        <span>
                          Total Score <span className="text-danger">*</span>{" "}
                        </span>
                      </Col>
                      <Col md="6">
                        <Input
                          type="text"
                          id="totalScore"
                          name="totalScore"
                          required
                          defaultValue={gmatData?.totalScore}
                        />
                      </Col>
                    </FormGroup>

                    <FormGroup
                      row
                      className="has-icon-left position-relative"
                    >
                      <Col md="5">
                        <span>
                          Total Rank <span className="text-danger">*</span>{" "}
                        </span>
                      </Col>
                      <Col md="6">
                        <Input
                          type="text"
                          id="totalRank"
                          name="totalRank"
                          required
                          defaultValue={gmatData?.totalRank}
                        />
                      </Col>
                    </FormGroup>

                    <FormGroup
                      row
                      className="has-icon-left position-relative"
                    >
                      <Col md="5">
                        <span>
                          Verbal Score <span className="text-danger">*</span>{" "}
                        </span>
                      </Col>
                      <Col md="6">
                        <Input
                          type="text"
                          id="verbalScore"
                          name="verbalScore"
                          required
                          defaultValue={gmatData?.verbalScore}
                        />
                      </Col>
                    </FormGroup>

                    <FormGroup
                      row
                      className="has-icon-left position-relative"
                    >
                      <Col md="5">
                        <span>
                          Verbal Rank <span className="text-danger">*</span>{" "}
                        </span>
                      </Col>
                      <Col md="6">
                        <Input
                          type="text"
                          id="verbalRank"
                          name="verbalRank"
                          required
                          defaultValue={gmatData?.verbalRank}
                        />
                      </Col>
                    </FormGroup>

                    <FormGroup
                      row
                      className="has-icon-left position-relative"
                    >
                      <Col md="5">
                        <span>
                          Quantitative Score{" "}
                          <span className="text-danger">*</span>{" "}
                        </span>
                      </Col>
                      <Col md="6">
                        <Input
                          type="text"
                          id="quantitativeScore"
                          name="quantitativeScore"
                          required
                          defaultValue={gmatData?.quantitativeScore}
                        />
                      </Col>
                    </FormGroup>

                    <FormGroup
                      row
                      className="has-icon-left position-relative"
                    >
                      <Col md="5">
                        <span>
                          Quantitative Rank{" "}
                          <span className="text-danger">*</span>{" "}
                        </span>
                      </Col>
                      <Col md="6">
                        <Input
                          type="text"
                          id="quantitativeRank"
                          name="quantitativeRank"
                          required
                          defaultValue={gmatData?.quantitativeRank}
                        />
                      </Col>
                    </FormGroup>

                    <FormGroup
                      row
                      className="has-icon-left position-relative"
                    >
                      <Col md="5">
                        <span>
                          Writing Score <span className="text-danger">*</span>{" "}
                        </span>
                      </Col>
                      <Col md="6">
                        <Input
                          type="text"
                          id="writingScore"
                          name="writingScore"
                          required
                          defaultValue={gmatData?.writingScore}
                        />
                      </Col>
                    </FormGroup>

                    <FormGroup
                      row
                      className="has-icon-left position-relative"
                    >
                      <Col md="5">
                        <span>
                          Writing Rank <span className="text-danger">*</span>{" "}
                        </span>
                      </Col>
                      <Col md="6">
                        <Input
                          type="text"
                          id="writingRank"
                          name="writingRank"
                          required
                          defaultValue={gmatData?.writingRank}
                        />
                      </Col>
                    </FormGroup>

                    <FormGroup
                      className="has-icon-left position-relative"
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                      }}
                    >
                      <Button
                        color="danger"
                        className="mr-1 mt-3"
                        onClick={closeModal3}
                      >
                        Cancel
                      </Button>

                      <Button
                        color="primary"
                        type="submit"
                        className="mr-1 mt-3"
                        disabled={buttonStatus}
                      >
                        Submit
                      </Button>
                    </FormGroup>
                  </Form>
                </ModalBody>
              </Modal>
              <div></div>
            </div>

            <FormGroup
              className="has-icon-left position-relative"
              style={{ display: "flex", justifyContent: "space-between" }}
            >
              <ButtonForFunction
                name={"Previous"}
                icon={<i className="fas fa-arrow-left-long mr-1"></i>}
                func={goBackward}
                className={"ms-md-2 mt-3 btn-warning"}
              />

              <Button.Ripple
                type="submit"
                className="mr-1 mt-3 btn-warning"
                onClick={handleForward}
               
              >
                Next
                <i className="fas fa-arrow-right-long ml-1"></i>
              </Button.Ripple>
            </FormGroup>
          </TabPane>
        </TabContent>
      </CardBody>
    </Card>
     }
    </div>
  );
};

export default TestScore;
