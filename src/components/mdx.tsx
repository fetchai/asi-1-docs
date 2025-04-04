"use client"
import React, { ReactNode, useState, useEffect, useRef } from "react";
import { Tab as HeadlessTab } from "@headlessui/react";
import { DropDownArrow, Tickicon } from "../icons/shared-icons";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";

function InfoIcon(properties) {
  return (
    <svg viewBox="0 0 16 16" aria-hidden="true" {...properties}>
      <circle cx="8" cy="8" r="8" strokeWidth="0" />
      <path
        fill="none"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.5"
        d="M6.75 7.75h1.5v3.5"
      />
      <circle cx="8" cy="4" r=".5" fill="none" />
    </svg>
  );
}

function WarnIcon(properties) {
  return (
    <svg viewBox="0 0 16 16" fill="red" aria-hidden="true" {...properties}>
      <path d="M8 0a8 8 0 1 0 8 8A8.009 8.009 0 0 0 8 0zm0 14a6 6 0 1 1 6-6 6.007 6.007 0 0 1-6 6zm1-9H7v6h2zm0 7H7v2h2z" />
    </svg>
  );
}

export function Note({ children }: { children: ReactNode }) {
  return (
    <div className="my-6 flex gap-2.5 rounded-2xl border border-emerald-500/20 bg-emerald-50/50 p-4 leading-6 text-emerald-900 dark:border-emerald-500/30 dark:bg-emerald-500/5 dark:text-emerald-200 dark:[--tw-prose-links-hover:theme(colors.emerald.300)] dark:[--tw-prose-links:theme(colors.white)]">
      <InfoIcon className="flex-none w-4 h-4 mt-1 fill-emerald-500 stroke-white dark:fill-emerald-200/20 dark:stroke-emerald-200" />
      <div className="[&gt;:first-child]:mt-0 [&gt;:last-child]:mb-0">
        {children}
      </div>
    </div>
  );
}

export function Warn({ children }: { children: ReactNode }) {
  return (
    <div className="my-6 flex gap-2.5 rounded-2xl border border-red-500/20 bg-red-50/50 p-4 leading-6 text-red-900 dark:border-red-500/30 dark:bg-red-500/5 dark:text-red-200 dark:[--tw-prose-links-hover:theme(colors.red.300)] dark:[--tw-prose-links:theme(colors.white)]">
      <WarnIcon className="flex-none w-4 h-4 mt-1 fill-red-500 stroke-white dark:fill-red-200/20 dark:stroke-red-200" />
      <div className="[&gt;:first-child]:mt-0 [&gt;:last-child]:mb-0">
        {children}
      </div>
    </div>
  );
}

export function Properties({ children }: { children: ReactNode }) {
  return (
    <div className="my-6">
      <ul
        role="list"
        className="p-0 m-0 list-none divide-y divide-zinc-900/5 dark:divide-white/5"
      >
        {children}
      </ul>
    </div>
  );
}

export function Property({
  name,
  type,
  required,
  nestedChildren,
  children,
}: {
  name: string;
  type: string;
  required?: boolean;
  nestedChildren?: { name: string; type: string; required?: boolean; description: ReactNode }[];
  children: ReactNode;
}) {
  return (
    <li className="px-0 py-4 m-0 first:pt-0 last:pb-0 dark-border">
      <dl className="flex flex-wrap items-center m-0 gap-x-3 gap-y-2">
        <dt className="sr-only">Name</dt>
        <dd>
          <code>{name}</code>
        </dd>
        <dt className="sr-only">Type</dt>
        <dd className="font-mono text-xs text-zinc-400 dark:text-white-40">
          {type}
        </dd>
        {required !== undefined && (
          <>
            <dt className="sr-only">Required</dt>
            <dd className="font-mono text-xs text-zinc-400 dark:text-white-40">
              {required ? `required` : `optional`}
            </dd>
          </>
        )}

        <dt className="sr-only">Description</dt>
        <dd className="w-full flex-none [&>*:first-child]:mt-0 [&>*:last-child]:mb-0 dark:text-white-60">
          {children}
        </dd>
      </dl>

      {nestedChildren && nestedChildren.length > 0 && (
        <ul className="pl-4 mt-2 ml-4 border-l border-zinc-400 dark:border-white-40">
          {nestedChildren.map((child) => (
            <Property
              key={child.name}
              name={child.name}
              type={child.type}
              required={child.required}
            >
              {child.description}
            </Property>
          ))}
        </ul>
      )}
    </li>
  );
}


function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

// leaving half as I think this will  be needed in future
export function Tabs({
  children,
  half = false,
}: {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  children: any;
  half: boolean;
}) {
  return (
    <div
      className={`rounded h-min overflow-auto ${half ? "w-full" : "w-full"
        }`}
    >
      <HeadlessTab.Group>
        <HeadlessTab.List className="flex p-1 space-x-1 rounded-xl">
          {React.Children.map(children, (child, index) => (
            <HeadlessTab
              key={index}
              className={({ selected }) =>
                classNames(
                  "w-full rounded-lg py-2.5 text-sm font-medium bg-slate-100",
                  " focus:outline-none focus:ring-2",
                  selected
                    ? "shadow"
                    : "text-white-100 hover:bg-white/[0.12] hover:text-white",
                )
              }
            >
              {child.props.heading}
            </HeadlessTab>
          ))}
        </HeadlessTab.List>
        <HeadlessTab.Panels>
          {React.Children.map(children, (child, index) => (
            <HeadlessTab.Panel
              key={index}
              className={classNames(
                "p-3 ring-opacity-60 ring-offset-2 ring-offset-blue-400 focus:outline-none focus:ring-2",
              )}
            >
              {child.props.children}
            </HeadlessTab.Panel>
          ))}
        </HeadlessTab.Panels>
      </HeadlessTab.Group>
    </div>
  );
}

interface TabProps {
  heading: string;
  children: ReactNode;
}

interface DropDownTabsProps {
  children: React.ReactElement<TabProps>[] | React.ReactElement<TabProps>;
}

export function DropDownTabs({ children }: DropDownTabsProps) {
  const [selectedTab, setSelectedTab] = useState(0);
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const tabs = React.Children.toArray(
    children,
  ) as React.ReactElement<TabProps>[];

  const handleTabChange = (index: number) => {
    setSelectedTab(index);
    setIsOpen(false);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [dropdownRef]);

  return (
    <>
      <div className="w-full flex gap-[14px]">
        <div
          className="relative items-center justify-center gap-2 mb-5 cursor-pointer dropdown-container"
          onClick={() => setIsOpen(!isOpen)}
          style={{ userSelect: "none" }}
        >
          {tabs[selectedTab]?.props.heading}
          <DropDownArrow />
        </div>
      </div>

      <div ref={dropdownRef}>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: isOpen ? "auto" : 0, opacity: isOpen ? 1 : 0 }}
            transition={{ duration: 0.1 }}
            className="absolute z-50 dropDown"
            style={{ overflow: "hidden" }}
          >
            {tabs.map((child, index) => (
              <div
                key={index}
                className={`dropdown-tab justify-between tab-text cursor-pointer ${index === selectedTab && `indgo-100`
                  }`}
                onClick={() => handleTabChange(index)}
              >
                {child?.props.heading}
                {index === selectedTab && <Tickicon />}
              </div>
            ))}
          </motion.div>
        )}
        <div className="mt-4">{tabs[selectedTab]?.props.children}</div>
      </div>
    </>
  );
}

export function Tab(properties) {
  return <HeadlessTab {...properties} />;
}

export function Row({ children }: { children: ReactNode }) {
  return (
    <div className="flex pt-4">{children}</div>
  );
}

export function Col({ children }: { children: ReactNode }) {
  return <div className="w-[50%]">{children}</div>;
}

export function Section({ children }: { children: ReactNode }) {
  return <div className="my-32">{children}</div>;
}

export const renderContent = (text: string) => {
  const regex = /(\[.*?]\(.*?\))/g;
  return text.split(regex).map((part, index) => {
    const match = part.match(/\[(.*?)]\((.*?)\)/);
    if (match) {
      return (
        <Link className="text-[#0970E7] underline decoration-from-font [text-underline-position:from-font]" key={index} href={match[2]}>
          {match[1]}
        </Link>
      );
    }
    return part;
  });
};

export function ApiIntro({ children }: { children: string }) {
  return (
    <div className="pb-4 pr-4 dark:text-white-60">{renderContent(children)}</div>
  );
}

export function Tag({ children }: { children: ReactNode }) {
  return (
    <div className="p-2 bg-green-100 border rounded w-fit">
      {children}
    </div>
  );
}

export function CodeHeading({ children }: { children: ReactNode }) {
  return <div className="flex gap-2">{children}</div>;
}

export function Grid3({ children }: { children: ReactNode }) {
  return (
    <div className="grid grid-cols-1 gap-4 pt-4 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
      {children}
    </div>
  );
}

export function Grid2({ children }: { children: ReactNode }) {
  return (
    <div className="grid grid-cols-1 gap-4 pt-4 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-2">
      {children}
    </div>
  );
}

interface ImageByThemePropsTypes {
  darkSrc: string;
  lightSrc: string;
  alt: string;
  width?: number | `${number}`;
  height?: number | `${number}`;
}

export const ImageByTheme = ({
  darkSrc,
  lightSrc,
  alt,
  width,
  height,
}: ImageByThemePropsTypes) => {
  const src = lightSrc;
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }
  return (
    <Image
      src={src}
      alt={alt}
      width={width}
      height={height}
      layout="responsive"
      className="my-6 rounded-lg"
    />
  );
};

