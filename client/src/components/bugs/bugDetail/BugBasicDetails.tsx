export const test = () => {
  return null;
};

// import React, { useEffect } from 'react';
// import DatePicker from 'react-datepicker';
// import '../../../public/BugCharacteristics.css';

// import { StageHeadersObject } from '../../stage/stageHeaders';
// import BugCharacteristics from './BugCharacteristics';
// import { StageStates } from '../../../reducers/stageStates';
// export interface BugBasicsProps {}

// export const BugBasics = () => {
//   const {
//     title,
//     description,
//     features,
//     descriptionChange,
//     editDescriptionClick,
//     optionSelect,
//   } = BugCharacteristics();

//   const optionsGenerator = (
//     options: Array<{ [key: string]: string }>,
//     type: 'category' | 'severity' | 'reproducible'
//   ) => {
//     var i = 0;
//     return options.map((item) => {
//       i++;
//       return (
//         <option value={item.value} key={i}>
//           {item.option}
//         </option>
//       );
//     });
//   };

//   return (
//     <div>
//       <h1 className="ui header" id="BugDetailHeader">
//         {title}
//       </h1>
//       <p className="ui meta" id="BugDetailCategory">
//         ({StageHeadersObject[features.category]})
//       </p>
//       {description.edit ? (
//         <textarea
//           name="EditDescription"
//           id="EditDescriptionTextArea"
//           onChange={descriptionChange}
//           onClick={(event) => event.stopPropagation()}
//           value={description.content}
//           rows={5}
//         ></textarea>
//       ) : (
//         <React.Fragment>
//           <div className="ui raised segment">
//             <p className="BugDescription">{description.content}</p>
//           </div>
//           <p id="EditDescription" onClick={editDescriptionClick}>
//             Edit Description
//           </p>
//         </React.Fragment>
//       )}

//       <div className="BugFeatures">
//         <div className="BugFeature">Bug Reproducible</div>
//         <select
//           className="ui dropdown"
//           value={features.reproducible}
//           name="reproducible"
//           onChange={optionSelect}
//         >
//           {optionsGenerator(
//             [
//               { value: 'None', option: 'None' },
//               { value: 'Consistently', option: 'Consistently' },
//               { value: 'Intermittently', option: 'Intermittently' },
//               { value: 'Rarely/Once', option: 'Rarely/Once' },
//             ],
//             'reproducible'
//           )}
//         </select>

//         <div className="BugFeature">Bug Severity</div>
//         <select
//           className="ui dropdown"
//           value={features.severity}
//           name="severity"
//           onChange={optionSelect}
//         >
//           {optionsGenerator(
//             [
//               { value: 'None', option: 'None' },
//               { value: 'High', option: 'High' },
//               { value: 'Medium', option: 'Medium' },
//               { value: 'Low', option: 'Low' },
//             ],
//             'severity'
//           )}
//         </select>

//         <div className="BugFeature">Category</div>
//         <select
//           className="ui dropdown"
//           name="category"
//           value={features.category}
//           onChange={optionSelect}
//         >
//           {optionsGenerator(
//             [
//               { value: StageStates.OPEN, option: StageHeadersObject.OPEN },
//               {
//                 value: StageStates.IN_PROGRESS,
//                 option: StageHeadersObject.IN_PROGRESS,
//               },
//               {
//                 value: StageStates.TEST_PENDING,
//                 option: StageHeadersObject.TEST_PENDING,
//               },
//               {
//                 value: StageStates.RE_OPENED,
//                 option: StageHeadersObject.RE_OPENED,
//               },
//               {
//                 value: StageStates.CLOSED,
//                 option: StageHeadersObject.CLOSED,
//               },
//             ],
//             'category'
//           )}
//         </select>
//       </div>
//     </div>
//   );
// };

// export const BugDeadline = () => {
//   const {
//     deadline,
//     deadlineChange,
//     enableDeadlineButtonClick,
//   } = BugCharacteristics();

//   return (
//     <div className="BugProperties">
//       <div className="datePicker-container">
//         <span>Deadline: </span>
//         <span id="DatePicker">
//           <DatePicker
//             selected={deadline.date}
//             onChange={deadlineChange}
//             showTimeSelect
//             disabled={!deadline.enabled}
//             timeFormat="h:mm aa"
//             timeIntervals={15}
//             timeCaption="time"
//             dateFormat="MMMM d, yyyy h:mm aa"
//           />
//         </span>
//         <div
//           id="EnableDeadlineButton"
//           className="ui button"
//           onClick={enableDeadlineButtonClick}
//         >
//           {deadline.enabled ? 'Disable' : 'Enable'}
//         </div>
//       </div>
//     </div>
//   );
// };

// export const BugActionButtons = () => {
//   const {
//     saveBtnRef,
//     deleteButtonClick,
//     saveButtonClick,
//   } = BugCharacteristics();

//   const saveBtnRef2: React.RefObject<HTMLDivElement> = React.createRef();

//   useEffect(() => {
//     // console.log(saveBtnRef.current);
//   });

//   return (
//     <div id="ActionButtons">
//       <button className="ui red button" onClick={deleteButtonClick}>
//         Delete
//       </button>
//       <div
//         className="ui inverted green button"
//         id="SaveButton"
//         onClick={saveButtonClick}
//         // style={{ display: 'none' }}
//         ref={saveBtnRef}
//       >
//         Save
//       </div>
//     </div>
//   );
// };
