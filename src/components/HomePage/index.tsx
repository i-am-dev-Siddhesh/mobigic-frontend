import UserService from "@/src/services/User";
import { errorFormatter } from "@/src/utils/helper";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import styles from "./index.module.css";

const HomePage = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const onSubmit = async (values: {
    filename: string;
    code: number | string;
  }) => {
    try {
      const resp: any = await UserService.downloadFile({
        filename: values.filename,
        code: +values?.code,
      });

      const href = URL.createObjectURL(resp.data);
      const link = document.createElement("a");
      link.href = href;
      link.setAttribute("download", "file.pdf");
      document.body.appendChild(link);
      link.click();

      document.body.removeChild(link);
      URL.revokeObjectURL(href);

      reset();
      toast.success(resp?.data.message, {
        position: toast.POSITION.TOP_RIGHT,
      });

      return resp;
    } catch (error) {
      const message = typeof error === "string" ? error : errorFormatter(error);
      toast.error(message);
    }
  };

  return (
    <div className={styles.root}>
      <h1>Uploaded Files:</h1>

      <table className={styles.table}>
        <tr>
          <th>Filname</th>
          <th>Action</th>
        </tr>

        <tr>
          <td style={{ padding: "10px" }}>user-file-1664680979124.png</td>
          <td style={{ padding: "10px" }}>
            <form
              onSubmit={handleSubmit((values) =>
                onSubmit({
                  filename: "user-file-1664772072123.png",
                  code: values.code,
                })
              )}
              style={{ display: "flex", gap: "20px" }}
            >
              <input
                type="number"
                placeholder="Enter code"
                className={styles.input}
                {...register("code")}
                required
              />

              <button>Download File</button>
            </form>
          </td>
        </tr>
      </table>
    </div>
  );
};

export default HomePage;

const data = [
  {
    id: 1,
    fileUrl: "user-file-1664680979124.png",
    code: 402953,
    ownerId: 1,
    createdAt: "2022-10-02T03:22:59.126Z",
    updatedAt: "2022-10-02T03:22:59.126Z",
  },
  {
    id: 2,
    fileUrl: "user-file-1664680984986.png",
    code: 195116,
    ownerId: 1,
    createdAt: "2022-10-02T03:23:04.987Z",
    updatedAt: "2022-10-02T03:23:04.987Z",
  },
  {
    id: 3,
    fileUrl: "user-file-1664682085501.png",
    code: 199515,
    ownerId: 1,
    createdAt: "2022-10-02T03:41:25.503Z",
    updatedAt: "2022-10-02T03:41:25.503Z",
  },
  {
    id: 4,
    fileUrl: "user-file-1664692555903.png",
    code: 473722,
    ownerId: 1,
    createdAt: "2022-10-02T06:35:55.904Z",
    updatedAt: "2022-10-02T06:35:55.905Z",
  },
  {
    id: 5,
    fileUrl: "user-file-1664692596103.png",
    code: 730090,
    ownerId: 1,
    createdAt: "2022-10-02T06:36:36.105Z",
    updatedAt: "2022-10-02T06:36:36.105Z",
  },
  {
    id: 6,
    fileUrl: "user-file-1664692657092.png",
    code: 590484,
    ownerId: 1,
    createdAt: "2022-10-02T06:37:37.093Z",
    updatedAt: "2022-10-02T06:37:37.094Z",
  },
  {
    id: 7,
    fileUrl: "user-file-1664692780746.png",
    code: 330225,
    ownerId: 1,
    createdAt: "2022-10-02T06:39:40.747Z",
    updatedAt: "2022-10-02T06:39:40.748Z",
  },
  {
    id: 8,
    fileUrl: "user-file-1664692962918.png",
    code: 524700,
    ownerId: 1,
    createdAt: "2022-10-02T06:42:42.919Z",
    updatedAt: "2022-10-02T06:42:42.920Z",
  },
  {
    id: 9,
    fileUrl: "user-file-1664693047393.png",
    code: 976976,
    ownerId: 1,
    createdAt: "2022-10-02T06:44:07.395Z",
    updatedAt: "2022-10-02T06:44:07.395Z",
  },
];
