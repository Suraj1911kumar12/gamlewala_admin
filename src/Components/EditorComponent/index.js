import React from 'react';
import SunEditor from 'suneditor-react';
import 'suneditor/dist/css/suneditor.min.css';

const EditorComponent = (props) => {

    // ERROR MESSAGE STATE
    const [alert, setAlert] = props.message;

    // HTML DATA INSIDE TEXT EDITOR
    const [value, setValue] = props.data;

    const [title, setTitle] = props.title;

    const handleTitle = (e) => {
        const { value } = e.target;
        setTitle(value)
    }

    const handleDescription = (e) => {
        const { value } = e.target;
        setDescription(value)
    }

    const [description, setDescription] = props.description

    // FORM SUBMITION
    const page = props.submit;

    // TEXT EDITOR DEFAULT FONTS
    const defaultFonts = [
        "Arial",
        "Comic Sans MS",
        "Courier New",
        "Impact",
        "Georgia",
        "Tahoma",
        "Trebuchet MS",
        "Verdana"
    ];

    // TEXT EDITOR FONT OPTIONS
    const sortedFontOptions = [
        "Logical",
        "Salesforce Sans",
        "Garamond",
        "Sans-Serif",
        "Serif",
        "Times New Roman",
        "Helvetica",
        ...defaultFonts
    ].sort();

    // TEXT EDITOR OPTIONS
    const options = {
        buttonList: [
            ["undo", "redo"],
            ["font", "fontSize"],
            ['paragraphStyle', 'blockquote'],
            [
                "bold",
                "underline",
                "italic",
                "strike",
                "subscript",
                "superscript"
            ],
            ["fontColor", "hiliteColor"],
            ["align", "list", "lineHeight"],
            ["outdent", "indent"],

            ["table", "horizontalRule", "link", "image", "video"],
            // ['math'] //You must add the 'katex' library at options to use the 'math' plugin.
            // ['imageGallery'], // You must add the "imageGalleryUrl".
            ["fullScreen", "showBlocks", "codeView"],
            ["preview", "print"],
            ["removeFormat"]

            // ['save', 'template'],
            // '/', Line break
        ], // Or Array of button list, eg. [['font', 'align'], ['image']]
        defaultTag: "div",
        minHeight: "300px",
        showPathLabel: false,
        font: sortedFontOptions
    };

    return (
        <React.Fragment>
            <div className="container-fluid py-4">
                <div className="row my-4">
                    <div className="col-md-12 mb-md-0 mb-4">
                        {/* DISPLAY ERROR MESSAGE */}
                        {alert?.errStatus && (
                            <div
                                className="alert alert-danger alert-dismissible fade show text-black"
                                role="alert"
                            >
                                {alert?.errMessage}
                                <button
                                    type="button"
                                    className="btn-close"
                                    data-bs-dismiss="alert"
                                    aria-label="Close"
                                    onClick={() => {
                                        setAlert({
                                            errStatus: false,
                                            successStatus: false,
                                            errMessage: "",
                                            successMessage: "",
                                        });
                                    }}
                                ></button>
                            </div>
                        )}

                        {/* DISPLAY SUCCESS MESSAGE */}
                        {alert?.successStatus && (
                            <div
                                className="alert alert-success alert-dismissible fade show text-black"
                                role="alert"
                            >
                                {alert?.successMessage}
                                <button
                                    type="button"
                                    className="btn-close"
                                    data-bs-dismiss="alert"
                                    aria-label="Close"
                                    onClick={() => {
                                        setAlert({
                                            errStatus: false,
                                            successStatus: false,
                                            errMessage: "",
                                            successMessage: "",
                                        });
                                    }}
                                ></button>
                            </div>
                        )}

                        <div className="g-4">
                            <div className="card mb-3">
                                <div className="card-body p-md-5">
                                    <h4>Page</h4>
                                    <form onSubmit={page}>
                                        <div className="row">
                                            <div className="mb-4 col-md-4">
                                                <label htmlFor="form-product/name" className="form-label">
                                                    Page Name
                                                </label>
                                                <input
                                                    type="text"
                                                    name="title"
                                                    className="form-control"
                                                    id="form-product/title"
                                                    value={title}
                                                    onChange={handleTitle}
                                                    required
                                                />
                                            </div>
                                            <div className="mb-4">
                                                <label
                                                    htmlFor="form-product/description"
                                                    className="form-label"
                                                >
                                                    Description
                                                </label>
                                                <textarea
                                                    id="form-product/description"
                                                    name="description"
                                                    className="sa-quill-control form-control sa-quill-control--ready"
                                                    rows="2"
                                                    value={description}
                                                    onChange={handleDescription}
                                                    required
                                                ></textarea>
                                            </div>
                                            <div className="mb-4">
                                                <label
                                                    htmlFor="form-product/description"
                                                    className="form-label"
                                                >
                                                    Content
                                                </label>
                                                <SunEditor
                                                    setContents={value}
                                                    onChange={setValue}
                                                    setOptions={options}
                                                />
                                            </div>
                                        </div>
                                        <div className="mb-4">
                                            <input type="submit" className="btn btn-outline-primary btn-sm mb-0" value='Save' />
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </React.Fragment>
    );
}

export default EditorComponent;
