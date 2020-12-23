import React from "react";
import { RiArrowDownSFill } from "react-icons/ri";
import { AiOutlineClose } from "react-icons/ai";
import Loader from "react-loader-spinner";
import PropagateLoader from "react-spinners/PropagateLoader";
import { css } from "@emotion/core";
import ContentLoader from "react-content-loader";

import {
  ButtonStyled,
  ButtonStyledModle,
  CreateText,
  EmptyTextHolder,
} from "../shared/SharedStyle";
export const CustomButton = ({
  lable,
  children,
  main,
  filter,
  onOpen,
  pageTitle,
  fun,
  undo,
  loading,
  extra,
}) => {
  return (
    <ButtonStyled
      main={main}
      extra={extra}
      undo={undo}
      loading={loading}
      onClick={main ? onOpen : fun}>
      {children}
      {lable}
      {filter ? <RiArrowDownSFill color="var(--lighterGray)" /> : ""}
    </ButtonStyled>
  );
};
export const CustomModleButton = ({ Loading, children, main, fun, extra }) => {
  return (
    <ButtonStyledModle
      Loading={Loading}
      main={main}
      extra={extra}
      onClick={fun}>
      {children}
    </ButtonStyledModle>
  );
};

// export const EmptyText = (Loading, Item) => {
//   const override = css`
//     display: block;
//     margin: 0 auto;
//     border-color: red;
//   `;
//   return Loading ? (
//     // <Loader
//     //   type="ThreeDots"
//     //   color="var(--yellow)"
//     //   height={100}
//     //   width={100}
//     //   // timeout={6000}

//     // />
//     //  <PropagateLoader
//     //     css={override}
//     //     size={25}
//     //     color={"var(--yellow)"}

//     //   />
//     // <EmptyTextHolder>
//     [1, 2, 3, 4, 5].map((i) => {
//       return (
//         <div
//           style={{
//             display: "flex",
//             width: "50vw",
//           }}
//         >
//           {[1, 2, 3, 4, 5].map((i, index) => {
//             return (
//               <div
//                 key={index}
//                 style={{
//                   width: "18vw",
//                   height: "40px",
//                   padding: "18px 0",
//                   borderBottom: "1px solid var(--lighterGray)",
//                 }}
//               >
//                 <ContentLoader
//                   speed={2}
//                   width={600}
//                   height={160}
//                   viewBox="0 0 600 160"
//                   backgroundColor="#f3f3f3"
//                   foregroundColor="#ecebeb"
//                 >
//                   <rect x="48" y="5" rx="3" ry="3" width="150" height="5" />
//                 </ContentLoader>
//               </div>
//             );
//           })}
//         </div>
//       );
//     })
//   ) : (
//     /* </EmptyTextHolder> */

//     <EmptyTextHolder>
//       <div>
//         <img src={require("../../public/images/noData.png")} />
//       </div>
//       <div style={{ color: "black" }}>No {Item + "s"} found</div>
//       <div style={{ width: "248px" }}>
//         You havent't add any {Item} yet . Tap here to add your first {Item}
//       </div>

//       <CreateText>
//         Add New {Item.charAt(0).toUpperCase() + Item.slice(1)}
//       </CreateText>
//     </EmptyTextHolder>
//   );
// };
export function ReservationLoading(props) {
  let data = [1, 2, 3, 4];
  return data.map((i, index) => (
    <div key={index}>
      <ContentLoader
        speed={1.5}
        width="100%"
        height="55px"
        viewBox="0 0 600 80"
        backgroundColor="#f3f3f3"
        foregroundColor="#ecebeb"
        {...props}>
        <rect x="0" y="8" rx="15" ry="15" width="88" height="65" />
        <rect x="100" y="60" rx="3" ry="90" width="300" height="5" />
        <rect x="520" y="8" rx="3" ry="90" width="88" height="7" />
      </ContentLoader>
    </div>
  ));
}

export function TextLoadS(props) {
  return (
    <div
      style={{
        textAlign: "left",
        width: "60px",
      }}>
      <ContentLoader
        speed={1}
        // width="100%"
        height="15px"
        viewBox="0 0 600 80"
        backgroundColor="#f3f3f3"
        foregroundColor="#ecebeb"
        {...props}>
        <rect x="0" y="8" rx="3" ry="90" width="350" height="30" />
      </ContentLoader>
    </div>
  );
}
