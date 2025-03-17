'use client'
import React, { useState, ReactNode, useRef } from "react";
import { CopyIcon, DropDownArrow } from "../icons/shared-icons";
import { OSProps, Windows, Mac, Ubuntu } from "../icons/os-icons";
import { useEffect } from "react";
import { motion } from "framer-motion";
import { useOSContext } from "../contexts/os-provider";

interface CodeGroupProps {
  children: ReactNode;
  isOSFile?: boolean;
  isLocalHostedFile?: boolean;
  hasCopy?: boolean;
  osBlocks: ReactNode;
  codeBlocks: ReactNode;
  dynamic?: boolean;
  digest?: string;
  selectedOs: string;
  handleOSChange: (newOs: string) => void;
}

interface CodeBlockProps {
  filename: string;
  dataLanguage?: string;
  local?: boolean;
  children: React.ReactNode;
  windows?: boolean;
  mac?: boolean;
  ubuntu?: boolean;
}

type CodeBoxProps = {
  filename?: string[];
  dataLanguage?: string;
  hasCopyCode?: boolean;
  children?: React.ReactNode;
  isOSFile?: boolean;
  isLocalHostedFile?: boolean;
  osBlocks: ReactNode;
  codeBlocks: ReactNode;
  selectedOs: string;
  handleOSChange: (newOs: string) => void;
};

type CodeBlock = {
  filename?: string;
  component?: ReactNode;
  hasCopy?: boolean;
};

interface DropdownProps {
  options: string[];
  selectedOption: string;
  onOptionSelect: (option: string) => void;
  placeholder?: string;
}

interface OsOption {
  name: string;
  icon: React.FC<OSProps>;
}

interface OsDropDownProps {
  selectedOption: string | null;
  onOptionSelect: (option: string) => void;
  placeholder: string;
  options: OsOption[];
}

export const OsDropDown: React.FC<OsDropDownProps> = ({
  selectedOption,
  onOptionSelect,
  placeholder,
  options,
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleOptionSelect = (option: string) => {
    onOptionSelect(option);
    setIsOpen(false);
  };

  const selectedOptionData = options.find((opt) => opt.name === selectedOption);
  return (
    <div className="os-dropdown relative left-2.5 ml-20">
      <div
        className="relative flex items-center gap-1 cursor-pointer"
        onClick={toggleDropdown}
      >
        {selectedOptionData ? (
          <>{selectedOptionData.icon && <selectedOptionData.icon />}</>
        ) : (
          placeholder
        )}
        <DropDownArrow />
      </div>
      {isOpen && (
        <motion.div
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: "auto", opacity: 1 }}
          transition={{ duration: 0.1 }}
          className="absolute z-50 mt-2 dropDown-os"
        >
          {options.map((option, index) => (
            <div
              key={index}
              className={`osmenu-tab-container justify-center cursor-pointer items-center ${selectedOption === option.name ? "blue-background" : ""
                }`}
              onClick={() => handleOptionSelect(option.name)}
            >
              {option.icon && (
                <option.icon selectedOS={selectedOption} name={option.name} />
              )}
            </div>
          ))}
        </motion.div>
      )}
    </div>
  );
};

export const Dropdown: React.FC<DropdownProps> = ({
  options,
  selectedOption,
  onOptionSelect,
  placeholder = "Select",
}) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const toggleDropdown = () => {
    setIsDropdownOpen((prev) => !prev);
  };

  const handleClickOutside = (event: MouseEvent) => {
    if (
      dropdownRef.current &&
      !dropdownRef.current.contains(event.target as Node)
    ) {
      setIsDropdownOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div ref={dropdownRef} className="relative">
      <div
        onClick={toggleDropdown}
        className="flex items-center justify-between gap-2 text-base transition-all cursor-pointer"
      >
        <span className="text-gray-700 dark:text-gray-200">
          {selectedOption || placeholder}
        </span>
        {options?.length > 1 && <DropDownArrow />}
      </div>

      {options?.length > 1 && isDropdownOpen && (
        <motion.div
          initial={{ opacity: 0, scaleY: 0 }}
          animate={{ opacity: 1, scaleY: 1 }}
          exit={{ opacity: 0, scaleY: 0 }}
          transition={{ duration: 0.15 }}
          className="absolute z-50 mt-2 overflow-hidden w-[200px] text-lg bg-white border border-gray-200 rounded-lg shadow-lg dark:bg-gray-800 dark:border-gray-700"
        >
          {options.map((option) => (
            <div
              key={option}
              className={`px-4 py-2 text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer transition-all ${option === selectedOption ? "bg-gray-200 dark:bg-gray-600" : ""
                }`}
              onClick={() => {
                onOptionSelect(option);
                setIsDropdownOpen(false);
              }}
            >
              {option}
            </div>
          ))}
        </motion.div>
      )}
    </div>
  );
};

export const CodeBlock: React.FC<{
  codeBlocks?: CodeBlock[];
  hasCopy?: boolean;
}> = ({ codeBlocks, hasCopy }) => {
  const [selectedLabel, setSelectedLabel] = useState<string>(
    codeBlocks && codeBlocks.length > 0 ? codeBlocks[0].filename : "",
  );

  if (!codeBlocks || codeBlocks.length === 0) {
    return <div>No code blocks available</div>;
  }

  const selectedCodeBlock = codeBlocks.find(
    (block) => block.filename === selectedLabel,
  );

  const [isCopied, setIsCopied] = useState(false);
  const codeRef = useRef<HTMLPreElement>(null);

  const handleCopy = () => {
    const codeContent = codeRef.current?.textContent;
    if (codeContent) {
      navigator.clipboard.writeText(codeContent).then(() => {
        setIsCopied(true);
        setTimeout(() => setIsCopied(false), 5000);
      });
    }
  };

  return (

    <div>
      <div className="justify-between x:px-4 x:text-xs x:text-gray-700 x:dark:text-gray-200 x:bg-gray-100 x:dark:bg-neutral-900 x:flex x:items-center x:h-12 x:gap-2 x:rounded-t-md x:border x:border-gray-300 x:dark:border-neutral-700 x:contrast-more:border-gray-900 x:contrast-more:dark:border-gray-50 x:border-b-0">
        <Dropdown
          options={codeBlocks.map((block) => block.filename)}
          selectedOption={selectedLabel}
          onOptionSelect={setSelectedLabel}
          placeholder="Select Language"
        />
        {hasCopy && (
          <div
            onClick={handleCopy}
            className="flex items-center gap-2 cursor-pointer"
          >
            {isCopied ? (
              <>
                <svg
                  width="12"
                  height="8"
                  viewBox="0 0 12 8"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className="copy-icon"
                >
                  <path d="M11.3359 0.414062C11.5469 0.648438 11.5469 1 11.3359 1.21094L5.14844 7.39844C4.91406 7.63281 4.5625 7.63281 4.35156 7.39844L1.16406 4.21094C0.929688 4 0.929688 3.64844 1.16406 3.4375C1.375 3.20312 1.72656 3.20312 1.9375 3.4375L4.72656 6.22656L10.5391 0.414062C10.75 0.203125 11.1016 0.203125 11.3125 0.414062H11.3359Z" />
                </svg>
                <span className="copy-text dark:text-white-80">
                  Copied
                </span>
              </>
            ) : (
              <CopyIcon />
            )}
          </div>
        )}
      </div>
      <pre ref={codeRef} className="x:group x:focus-visible:nextra-focus x:overflow-x-auto x:subpixel-antialiased x:text-[.9em] x:bg-white x:dark:bg-black x:py-4 x:ring-1 x:ring-inset x:ring-gray-300 x:dark:ring-neutral-700 x:contrast-more:ring-gray-900 x:contrast-more:dark:ring-gray-50 x:contrast-more:contrast-150 x:rounded-b-md not-prose border-0" style={{ width: "100%" }}>
        {selectedCodeBlock?.component ?? "No code block selected"}
      </pre>
    </div>
  );
};

const osmenu = [
  { name: "windows", icon: Windows },
  { name: "mac", icon: Mac },
  { name: "ubuntu", icon: Ubuntu },
];

const agentType = [
  { name: "Self hosted", label: "local" },
  { name: "Agentverse", label: "hosted" },
];

export const CustomPre: React.FC<CodeBoxProps> = ({
  isLocalHostedFile,
  isOSFile,
  codeBlocks,
  osBlocks,
  selectedOs,
  handleOSChange,
}) => {
  const codeRef = useRef<HTMLDivElement>(null);

  const renderCodeChild = () => {
    return React.Children.map(codeBlocks, (child) => {
      if (React.isValidElement<CodeBlockProps>(child)) {
        return child;
      }
      return null;
    });
  };

  const child = renderCodeChild();
  const localHostdType =
    child?.length === 1 && !child[0]?.props?.local
      ? agentType[1].name
      : agentType[0].name;

  const [selectedType, setSelectedType] = useState(localHostdType);

  const filteredAgentType =
    child?.length === 2
      ? agentType
      : agentType.filter((agent) =>
          child?.length === 1 && child[0]?.props?.local
            ? agent.label === "local"
            : agent.label === "hosted",
        );

  const renderCodeBlock = () => {
    return React.Children.map(codeBlocks, (child) => {
      if (React.isValidElement<CodeBlockProps>(child)) {
        if (selectedType === "Self hosted" && child?.props?.local) {
          return codeBlocks && child?.props?.children;
        } else if (selectedType === "Agentverse" && !child?.props?.local) {
          return codeBlocks && child?.props?.children;
        }
      }
      return null;
    });
  };

  const renderOsBlock = () => {
    return React.Children.map(osBlocks, (child) => {
      if (React.isValidElement<CodeBlockProps>(child)) {
        if (selectedOs === "windows" && child?.props?.windows) {
          return codeBlocks && child?.props?.children;
        } else if (selectedOs === "mac" && child?.props?.mac) {
          return codeBlocks && child?.props?.children;
        } else if (selectedOs === "ubuntu" && child?.props?.ubuntu) {
          return codeBlocks && child?.props?.children;
        }
      }
      return null;
    });
  };

  return (
    <div className="flex flex-col">
      <div
        className={isOSFile || isLocalHostedFile ? "relative" : "custom-pre"}
      >
        <div
          className={`w-full ${
            isLocalHostedFile
              ? "absolute top-2 left-32  px-6 z-[10]"
              : "absolute top-3 px-12 right-6 z-[10]"
          } flex justify-between`}
        >
          <div className="flex gap-3 mt-1">
            {isLocalHostedFile && (
              <Dropdown
                selectedOption={selectedType}
                onOptionSelect={setSelectedType}
                placeholder="Select Language"
                options={filteredAgentType.map((item) => item.name)}
              />
            )}
            {isOSFile && (
              <OsDropDown
                selectedOption={selectedOs}
                onOptionSelect={handleOSChange}
                placeholder="Select Language"
                options={osmenu as []}
              />
            )}
          </div>
        </div>
        <div className="gap-4 flex flex-col">
          <div
            id="code-block-outer"
            className="code-style-outer"
            style={{ overflowX: "scroll", width: "100%" }}
            ref={codeRef}
          >
            {isOSFile ? renderOsBlock() : renderCodeBlock()}
          </div>
        </div>
      </div>
    </div>
  );
};

export const ModifiedPre = ({
  children,
  filename,
  hasCopyCode,
}: {
  children?: ReactNode;
  filename?: string;
  hasCopyCode?: boolean;
}) => {
  const [isCopied, setIsCopied] = useState(false);
  const codeRef = useRef<HTMLDivElement>(null);

  const handleCopy = () => {
    const codeElements = codeRef.current?.querySelectorAll("code");
    const codeText = [...(codeElements ?? [])]
      .map((el) => el.textContent)
      .join("\n");

    if (codeText) {
      navigator.clipboard.writeText(codeText).then(() => {
        setIsCopied(true);
        setTimeout(() => setIsCopied(false), 5000);
      });
    }
  };

  return (
    <pre className={`pre-normal`}>
      <div
        className={`p-2 flex ${filename ? "justify-between items-center" : "justify-end"
          } w-full`}
      >
        {filename && <span className="filename">{filename}</span>}
        {hasCopyCode && (
          <div
            id="modified-copy"
            onClick={handleCopy}
            className="flex items-center gap-2 ml-auto cursor-pointer"
          >
            {isCopied ? (
              <>
                <svg
                  width="12"
                  height="8"
                  viewBox="0 0 12 8"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className="copy-icon"
                >
                  <path d="M11.3359 0.414062C11.5469 0.648438 11.5469 1 11.3359 1.21094L5.14844 7.39844C4.91406 7.63281 4.5625 7.63281 4.35156 7.39844L1.16406 4.21094C0.929688 4 0.929688 3.64844 1.16406 3.4375C1.375 3.20312 1.72656 3.20312 1.9375 3.4375L4.72656 6.22656L10.5391 0.414062C10.75 0.203125 11.1016 0.203125 11.3125 0.414062H11.3359Z" />
                </svg>
                <span className="copy-text dark:text-white-80">
                  Copied
                </span>
              </>
            ) : (
              <CopyIcon />
            )}
          </div>
        )}
      </div>
      <div ref={codeRef}>{children}</div>
    </pre>
  );
};

export const CodeGroup: React.FC<CodeGroupProps> = ({
  children,
  isOSFile,
  isLocalHostedFile,
  hasCopy,
}: CodeGroupProps): React.ReactElement | null => {
  const codeBlocks = React.Children.toArray(children).filter(
    (child): child is React.ReactElement<CodeBlockProps> => {
      return (
        React.isValidElement(child) &&
        (child as React.ReactElement<CodeBlockProps>).props.local !== undefined
      );
    }
  );

  const { selectedOS, setSelectedOS } = useOSContext();

  const handleOSChange = (newOS: string) => {
    setSelectedOS(newOS);
    localStorage.setItem("storedOsOption", newOS);
  };

  const osBlocks = React.Children.toArray(children).filter(
    (child): child is React.ReactElement<CodeBlockProps> => {
      if (!React.isValidElement(child)) return false;

      const props = (child as React.ReactElement<CodeBlockProps>).props;
      return "windows" in props || "mac" in props || "ubuntu" in props;
    }
  );

  const [firstChild] = React.Children.toArray(children);
  if (React.isValidElement(firstChild)) {
    const modifiedFirstChild = React.cloneElement(firstChild as React.ReactElement<CodeGroupProps>, {
      isLocalHostedFile,
      isOSFile,
      hasCopy,
      codeBlocks,
      osBlocks,
      selectedOs: selectedOS,
      handleOSChange,
    });

    return modifiedFirstChild;
  }

  return <>{children}</> || null;
};




export const DocsCode: React.FC<CodeGroupProps> = ({
  codeBlocks,
  isLocalHostedFile,
  isOSFile,
  hasCopy,
  osBlocks,
  selectedOs,
  handleOSChange,
}) => {
  return (
    <div className="mt-3">
      <CustomPre
        isLocalHostedFile={isLocalHostedFile}
        handleOSChange={handleOSChange}
        selectedOs={selectedOs}
        isOSFile={isOSFile}
        hasCopyCode={hasCopy}
        codeBlocks={codeBlocks}
        osBlocks={osBlocks}
      />
    </div>
  );
};

interface CodeSegment {
  path: string;
  lineStart: number;
  lineEnd: number;
  hosted: boolean;
  filename?: string;
}

interface GithubCodeSegment {
  digest?: string;
}

export const GithubCodeSegment: React.FC<GithubCodeSegment> = () => {
  return <div hidden />;
};

export const CodeSegment: React.FC<CodeSegment> = () => {
  return <div hidden />;
};
