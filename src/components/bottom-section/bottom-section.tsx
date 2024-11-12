import "./bottom-section.css";

import { AttachmentIcon, SubmitIcon } from "../../icons";

import { ChangeEvent } from "react";

interface ICgBottomSection {
  getAttachment: (event: ChangeEvent<HTMLInputElement>) => void
  getMessages: () => void;
  value: string;
  onChange: (e: any) => void;
}

const CgBottomSection = ({ getAttachment, getMessages, value, onChange }: ICgBottomSection) => {
  return (
    <section className="bottomSection">
      <div className="inputContainer">
        <input
          type="text"
          placeholder="Type a message"
          value={value}
          onChange={onChange}
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              getMessages();
            }
          }}
          className="input-box"
        />

        <div id="attachment">
          <label
            htmlFor="csv-upload"
            style={{ cursor: 'pointer', display: 'inline-flex', alignItems: 'center', position: 'relative' }}
          >
            <div style={{ display: 'inline-flex', alignItems: 'center' }}>
              <AttachmentIcon />
              <span
                className="upload-csv">
                Upload CSV
              </span>
            </div>
          </label>
          <input
            type="file"
            id="csv-upload"
            accept=".csv"
            onChange={getAttachment}
            style={{ display: 'none' }}
          />
        </div>

        <div id="submit" onClick={getMessages}>
          <SubmitIcon />
        </div>
      </div>
    </section>
  );
};

export default CgBottomSection;
