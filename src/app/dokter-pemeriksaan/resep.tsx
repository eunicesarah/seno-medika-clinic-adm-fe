import React, { useState } from 'react';
import ResepMasuk from './resep_masuk';
import ExpandableContent from "../components/expandableContent";

interface Tab {
    title: string;
    content: React.ReactNode;
}

export default function Resep() {
    const [activeTab, setActiveTab] = useState(0);
    const [showPopup2, setShowPopup2] = useState(false);


    const tabs: Tab[] = [
        {
            title: 'Resep',
            content: <ResepMasuk />
        },
        // {
        //     title: 'Resep Keluar',
        //     content: <div> Resep Keluar</div>
        // }
    ];

    return (
        <div className="flex flex-col w-full pt-12 pl-6 pr-10 pb-10 mb-14 rounded-md ">
            <form onSubmit={(e) => e.preventDefault()}>
                <div className="mt-2">
                    <div>
                        {tabs.map((tab, index) => (
                            <button
                                key={index}
                                onClick={() => setActiveTab(index)}
                                className="text-whit px-10 py-3"
                                style={{ 
                                    fontWeight: 'bold',
                                    backgroundColor: activeTab === index ? '#EDF4F2' : '#95BEAF',
                                    color: activeTab === index ? '#000000' : '#46846E'  
                                }}
                                title={`${tab.title}Content`}
                            >
                                {tab.title}
                            </button>
                        ))}
                    </div>
                    <div className="bg-tint7">
                        {tabs[activeTab].content}
                    </div>
                </div>
            </form>
        </div>
    );
}

