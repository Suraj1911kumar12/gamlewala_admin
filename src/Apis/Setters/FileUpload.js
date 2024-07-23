import axios from "axios";

const FileUpload = async (props) => {
  console.log(props);
  try {
    function getSession(cname) {
      return window.sessionStorage.getItem(cname);
    }
    let file = {
      image: props.image,
      // type: props.type,
      // module_path: props.path,
      // module_id: 1,
    };

    let token = getSession("authorization");

    const response = axios.post(
      // `${process.env.REACT_APP_API_BASE_URL}image-upload`,
      "https://gamlewala.in:5555/api/common/image-upload",
      file,
      {
        headers: {
          Authorization: `bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
        withCredentials: true,
      }
    )
    return response;
  } catch (error) {
    console.log(error);
  }
};

export default FileUpload;


// import axios from "axios";

// const FileUpload = async (props) => {
//   try {
//     function getSession(cname) {
//       return window.sessionStorage.getItem(cname);
//     }

//     let file = {
//       image: props.image,
//     };

//     let token = getSession("authorization");

//     console.log("1");

//     // Validate image dimensions
//     const validateImage = (file) => {
//       console.log("aaa");
//       return new Promise((resolve, reject) => {
//         const reader = new FileReader();
//         reader.onload = (event) => {
//           const img = new Image();
//           img.onload = () => {
//             const { width, height } = img;
//             // Add your validation logic here
//             if (width != 1024 || height != 1024) {
//               reject("Image dimensions must be less than or equal to 1024x1024");
//               console.log("aaaaaaaaa");
//             } else {
//               resolve();
//               console.log("nooooooooo");
//             }
//           };
//           img.src = event.target.result;
//         };
//         reader.readAsDataURL(file);
//       });
//     };

//     // Call the validation function before uploading
//     await validateImage(props.image);

//     const response = await axios.post(
//       // `${process.env.REACT_APP_API_BASE_URL}image-upload`,
//       "https://gamlewala.in:5555/api/common/image-upload",
//       file,
//       {
//         headers: {
//           Authorization: `bearer ${token}`,
//           "Content-Type": "multipart/form-data",
//         },
//         withCredentials: true,
//       }
//     );
//     return response;
//   } catch (error) {
//     console.log(error);
//   }
// };

// export default FileUpload;