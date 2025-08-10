import * as React from 'react';
import { useEffect, useMemo, useState } from 'react';
import { Card } from '@/ui/Card';
import { Button } from '@/ui/Button';
import { calcSubtotal, discountAmount, grandTotal, sumIncl, timelineDays, getPriceDisplay, type Service, type Preset } from '@/lib/calc';

// Fallback data in case import fails
const fallbackData = {
  presets: [
    {
      id: "starter",
      label: "Starter",
      tag: "Best for first launch",
      days: 7,
      includes: ["brand_kit", "one_page_site"],
      price_pre_gst: 10000,
      discount_pct: 0.05
    }
  ],
  items: [
    {
      id: "brand_kit",
      label: "Brand Kit",
      outcome: "A usable identity & starter assets",
      includes: ["Logo lockup", "Colors + type", "Social kit (5 templates)"],
      days: 3,
      price_pre_gst: 8000,
      discount_pct: 0.05
    }
  ],
  rules: {
    pricing_display: "ex_gst",
    gst_rate: 0.18,
    discounts: [
      { "min_items": 2, "percent": 0.05 },
      { "min_items": 3, "percent": 0.10 },
      { "min_items": 5, "percent": 0.15 }
    ]
  }
};

export default function Calculator() {
  // Debug logging
  console.log('🔍 Calculator component rendering');
  
  const [mode, setMode] = useState<'quick' | 'advanced'>('quick');
  const [picked, setPicked] = useState<string[]>([]);
  const [expandedItems, setExpandedItems] = useState<Set<string>>(new Set());
  const [showMath, setShowMath] = useState(false);
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Load pricing data
  useEffect(() => {
    const loadData = async () => {
      try {
        console.log('📊 Loading pricing data...');
        
        // Try to fetch the data
        const response = await fetch('/content/pricing/services.json');
        if (response.ok) {
          const jsonData = await response.json();
          console.log('✅ Data loaded successfully:', jsonData);
          setData(jsonData);
        } else {
          console.warn('⚠️ Failed to fetch data, using fallback');
          setData(fallbackData);
        }
      } catch (err) {
        console.warn('⚠️ Error loading data, using fallback:', err);
        setData(fallbackData);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, []);

  // Use fallback if no data loaded
  const finalData = data || fallbackData;
  console.log('🔄 Final data being used:', finalData);

  const presets = (finalData?.presets || []) as Preset[];
  const items = (finalData?.items || []) as Service[];
  const rules = finalData?.rules;

  // Debug logging for data parsing
  console.log('🎯 Parsed presets:', presets);
  console.log('🎯 Parsed items:', items);
  console.log('🎯 Parsed rules:', rules);

  const map = useMemo(() => Object.fromEntries(items.map(s => [s.id, s])), [items]);
  const presetMap = useMemo(() => Object.fromEntries(presets.map(p => [p.id, p])), [presets]);

  // Debug logging for maps
  console.log('🗺️ Service map:', map);
  console.log('🗺️ Preset map:', presetMap);

  // deep-link parse with new schema support
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const pick = params.get('pick');
    const modeParam = params.get('mode');
    
    if (pick) {
      const keys = pick.split(',').filter(Boolean);
      
      // Check if it's a preset (backward compatibility + new schema)
      if (presetMap[keys[0]]) {
        // It's a preset - set to quick mode
        setMode('quick');
        setPicked(keys);
        console.log('🔗 Deep link: Preset detected, set to quick mode');
      } else {
        // It's individual items - check mode parameter
        const detectedMode = modeParam === 'quick' ? 'quick' : 'advanced';
        setMode(detectedMode);
        setPicked(keys.filter(k => map[k]));
        console.log(`🔗 Deep link: Items detected, mode set to ${detectedMode}`);
      }
    } else if (modeParam) {
      // Only mode specified, no items
      setMode(modeParam === 'quick' ? 'quick' : 'advanced');
      setPicked([]);
      console.log(`🔗 Deep link: Mode only, set to ${modeParam}`);
    }
  }, [map, presetMap]);

  // deep-link sync with new schema
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    
    // Always sync mode
    params.set('mode', mode);
    
    // Sync picked items
    if (picked.length) {
      params.set('pick', picked.join(','));
    } else {
      params.delete('pick');
    }
    
    // Build new URL
    const next = `${window.location.pathname}?${params.toString()}`;
    
    // Only update if URL actually changed
    if (next !== window.location.pathname + window.location.search) {
      window.history.replaceState({}, '', next);
      console.log('🔗 URL updated:', next);
    }
  }, [mode, picked]);

  const handlePresetSelect = (presetKey: string) => {
    const preset = presetMap[presetKey];
    if (preset) {
      setPicked(preset.includes);
      setMode('quick');
    }
  };

  const handleItemToggle = (itemKey: string) => {
    setPicked(prev => 
      prev.includes(itemKey) 
        ? prev.filter(k => k !== itemKey)
        : [...prev, itemKey]
    );
  };

  const toggleExpanded = (itemKey: string) => {
    setExpandedItems(prev => {
      const next = new Set(prev);
      if (next.has(itemKey)) {
        next.delete(itemKey);
      } else {
        next.add(itemKey);
      }
      return next;
    });
  };

  // Utility function to generate shareable URLs
  const generateShareableUrl = (customMode?: 'quick' | 'advanced', customPicked?: string[]) => {
    const params = new URLSearchParams();
    const targetMode = customMode || mode;
    const targetPicked = customPicked || picked;
    
    params.set('mode', targetMode);
    if (targetPicked.length) {
      params.set('pick', targetPicked.join(','));
    }
    
    return `${window.location.origin}${window.location.pathname}?${params.toString()}`;
  };

  // Debug deep link state
  useEffect(() => {
    console.log('🔗 Deep link state:', {
      mode,
      picked,
      url: window.location.href,
      shareableUrl: generateShareableUrl()
    });
  }, [mode, picked]);

  // Calculate totals
  const selectedItems = picked.map(key => map[key]).filter(Boolean);
  const subtotal = sumIncl(selectedItems);
  const discount = discountAmount(subtotal, picked.length);
  const total = grandTotal(subtotal, discount);
  const timeline = timelineDays(selectedItems);

  // Debug logging for calculations
  console.log('🧮 Selected items:', selectedItems);
  console.log('🧮 Subtotal:', subtotal);
  console.log('🧮 Discount:', discount);
  console.log('🧮 Total:', total);
  console.log('🧮 Timeline:', timeline);

  // Show loading state
  if (loading) {
    return (
      <section className="py-14" aria-labelledby="calc-heading">
        <div className="container mx-auto px-4">
          <h2 id="calc-heading" className="text-2xl sm:text-3xl font-bold mb-4">Pricing Calculator</h2>
          <p className="text-gray-600 dark:text-gray-300">Loading pricing data...</p>
        </div>
      </section>
    );
  }

  // Early return if no data loaded
  if (!presets || !items || presets.length === 0 || items.length === 0) {
    console.log('⚠️ Early return triggered - missing data');
    console.log('⚠️ Presets check:', !presets, presets?.length === 0);
    console.log('⚠️ Items check:', !items, items?.length === 0);
    return (
      <section className="py-14" aria-labelledby="calc-heading">
        <div className="container mx-auto px-4">
          <h2 id="calc-heading" className="text-2xl sm:text-3xl font-bold mb-4">Pricing Calculator</h2>
          <p className="text-gray-600 dark:text-gray-300">Unable to load pricing data. Please try refreshing the page.</p>
        </div>
      </section>
    );
  }

  console.log('✅ Rendering full calculator component');
  return (
    <section className="py-14" aria-labelledby="calc-heading">
      <div className="container mx-auto px-4 grid gap-8 md:grid-cols-[1fr,360px]">
        <div>
          <h2 id="calc-heading" className="text-2xl sm:text-3xl font-bold mb-4">Pricing Calculator</h2>
          
          {/* Mode Toggle */}
          <div className="flex items-center gap-2 mb-6 p-1 bg-gray-100 dark:bg-gray-800 rounded-lg w-fit">
            <button
              onClick={() => setMode('quick')}
              className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                mode === 'quick'
                  ? 'bg-white dark:bg-gray-700 text-gray-900 dark:text-white shadow-sm'
                  : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'
              }`}
            >
              Quick
            </button>
            <button
              onClick={() => setMode('advanced')}
              className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                mode === 'advanced'
                  ? 'bg-white dark:bg-gray-700 text-gray-900 dark:text-white shadow-sm'
                  : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'
              }`}
            >
              Advanced
            </button>
          </div>

          {mode === 'quick' ? (
            <>
              <p className="text-gray-600 dark:text-gray-300 mb-6">
                Not sure what to pick? Start with a preset. You can fine-tune anytime.
              </p>
              <div className="grid gap-4 sm:grid-cols-3">
                {presets.map(preset => (
                  <Card 
                    key={preset.id} 
                    className={`p-6 cursor-pointer transition-all hover:shadow-lg ${
                      picked.length > 0 && preset.includes.every(key => picked.includes(key))
                        ? 'ring-2 ring-primary bg-primary/5'
                        : 'hover:scale-[1.02]'
                    }`}
                    onClick={() => handlePresetSelect(preset.id)}
                  >
                    <div className="text-center">
                      <h3 className="font-bold text-lg text-gray-900 dark:text-white mb-2">
                        {preset.label}
                      </h3>
                      <p className="text-sm text-primary font-medium mb-3">{preset.tag}</p>
                      <div className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                        ₹{Math.round(preset.price_pre_gst * 1.18).toLocaleString('en-IN')}
                      </div>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        incl. GST · ~{preset.days} days
                      </p>
                    </div>
                  </Card>
                ))}
              </div>
            </>
          ) : (
            <>
              <p className="text-gray-600 dark:text-gray-300 mb-6">
                Prefer custom? Pick only what you need.
              </p>
              <div className="grid gap-4 sm:grid-cols-2">
                {items.map(item => {
                  const isSelected = picked.includes(item.id);
                  const priceDisplay = getPriceDisplay(item);
                  
                  return (
                    <Card 
                      key={item.id} 
                      className={`p-4 transition-all hover:shadow-lg ${
                        isSelected ? 'ring-2 ring-primary bg-primary/5' : ''
                      }`}
                    >
                      <label className="flex items-start gap-3 cursor-pointer">
                        <input 
                          className="mt-1 h-5 w-5 text-primary focus:ring-2 focus:ring-primary focus:ring-offset-2" 
                          type="checkbox" 
                          checked={isSelected} 
                          onChange={() => handleItemToggle(item.id)} 
                          aria-label={`${item.label} for ₹${priceDisplay.incl.toLocaleString('en-IN')} incl. GST`} 
                        />
                        <div className="flex-1">
                          <div className="font-semibold text-gray-900 dark:text-white mb-1">
                            {item.label}
                          </div>
                          {item.outcome && (
                            <p className="text-sm text-gray-600 dark:text-gray-300 mb-2">
                              {item.outcome}
                            </p>
                          )}
                          <div className="text-sm text-gray-700 dark:text-gray-200 font-medium mb-2">
                            ₹{priceDisplay.incl.toLocaleString('en-IN')} incl. GST
                          </div>
                          <div className="text-xs text-gray-500 dark:text-gray-400 mb-2">
                            ~{item.days} days
                          </div>
                          {item.includes && (
                            <button
                              type="button"
                              onClick={(e) => {
                                e.preventDefault();
                                toggleExpanded(item.id);
                              }}
                              className="text-xs text-primary hover:text-primary/80 font-medium"
                            >
                              {expandedItems.has(item.id) ? 'Hide' : 'Show'} what's included
                            </button>
                          )}
                          {item.includes && expandedItems.has(item.id) && (
                            <ul className="mt-2 text-xs text-gray-600 dark:text-gray-400 space-y-1">
                              {item.includes.map((feature, idx) => (
                                <li key={idx} className="flex items-center gap-2">
                                  <span className="w-1.5 h-1.5 bg-primary rounded-full"></span>
                                  {feature}
                                </li>
                              ))}
                            </ul>
                          )}
                        </div>
                      </label>
                    </Card>
                  );
                })}
              </div>
            </>
          )}
        </div>

        {/* Summary */}
        <aside className="md:sticky md:top-4 h-fit rounded-2xl border border-gray-100 bg-white/80 dark:bg-white/10 dark:border-white/10 p-5 backdrop-blur" aria-live="polite">
          <h3 className="font-semibold text-lg text-gray-900 dark:text-white">Your estimate</h3>
          
          {picked.length === 0 ? (
            <div className="mt-4 text-center py-8">
              <p className="text-gray-500 dark:text-gray-400">
                {mode === 'quick' ? 'Choose a preset to see your quote' : 'Pick services to see your quote'}
              </p>
              <Button className="mt-4 w-full" disabled>
                Get started
              </Button>
            </div>
          ) : (
            <>
              {/* Summary Line */}
              <div className="mt-4 p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                <div className="text-sm text-gray-900 dark:text-white">
                  {selectedItems.length === 1 ? (
                    `${selectedItems[0].label} · ~${timeline} days · ₹${total.toLocaleString('en-IN')} incl. GST`
                  ) : (
                    `${selectedItems.length} services · ~${timeline} days · ₹${total.toLocaleString('en-IN')} incl. GST`
                  )}
                </div>
                <button
                  onClick={() => setShowMath(!showMath)}
                  className="text-xs text-primary hover:text-primary/80 mt-2 font-medium"
                >
                  {showMath ? 'Hide' : 'Show'} calculation details
                </button>
              </div>

              {/* Math Details */}
              {showMath && (
                <dl className="mt-4 space-y-2 text-sm">
                  <div className="flex justify-between">
                    <dt className="text-gray-600 dark:text-gray-300">Subtotal (ex. GST)</dt>
                    <dd className="font-medium">₹{Math.round(subtotal / (1 + 0.18)).toLocaleString('en-IN')}</dd>
                  </div>
                  {discount > 0 && (
                    <div className="flex justify-between text-green-600 dark:text-green-400">
                      <dt>Bundle Discount</dt>
                      <dd>−₹{Math.round(discount / (1 + 0.18)).toLocaleString('en-IN')}</dd>
                    </div>
                  )}
                  <div className="flex justify-between">
                    <dt className="text-gray-600 dark:text-gray-300">GST (18%)</dt>
                    <dd className="font-medium">₹{Math.round((subtotal - discount) * 0.18).toLocaleString('en-IN')}</dd>
                  </div>
                </dl>
              )}

              <div className="mt-4 border-t pt-4 flex justify-between font-semibold text-lg">
                <span className="text-gray-900 dark:text-white">Total</span>
                <span className="text-primary">₹{Math.round(total).toLocaleString('en-IN')}</span>
              </div>
              
              <Button className="mt-4 w-full">
                Get started
              </Button>
              
              {/* Shareable URL Section */}
              <div className="mt-4 p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                <div className="text-xs text-gray-600 dark:text-gray-400 mb-2">
                  Share this configuration:
                </div>
                <div className="flex items-center gap-2">
                  <input
                    type="text"
                    value={generateShareableUrl()}
                    readOnly
                    className="flex-1 text-xs bg-white dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded px-2 py-1 text-gray-700 dark:text-gray-300"
                  />
                  <button
                    onClick={() => {
                      navigator.clipboard.writeText(generateShareableUrl());
                      // You could add a toast notification here
                    }}
                    className="text-xs text-primary hover:text-primary/80 font-medium px-2 py-1 hover:bg-primary/10 rounded"
                  >
                    Copy
                  </button>
                </div>
                <div className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                  Mode: {mode} • Items: {picked.length}
                </div>
              </div>
              
              {picked.length >= 2 && (
                <p className="mt-2 text-xs text-gray-500 dark:text-gray-400 text-center">
                  {picked.length === 2 && "5% bundle discount applied"}
                  {picked.length >= 3 && picked.length <= 4 && "10% bundle discount applied"}
                  {picked.length >= 5 && "15% bundle discount applied"}
                </p>
              )}
              
              <p className="mt-3 text-xs text-gray-500 dark:text-gray-400 text-center">
                Estimates are inclusive of GST and based on typical scope. We'll confirm on a call.
              </p>
            </>
          )}
        </aside>
      </div>
    </section>
  );
}
