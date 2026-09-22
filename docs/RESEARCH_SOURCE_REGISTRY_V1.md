# Property OS Research Source Registry v1

Research snapshot: 2026-09-22

Purpose: make it clear which modeling ideas came from current product evidence, legal/official material, market examples or standards.

## A. Iranian marketplace / property search

### Kilid
Source:
- Google Play listing, current surfaced description (updated 2026-09-15 in English listing)

Supported signals:
- property search by location
- draw-on-map search
- region/neighborhood/area/age filters
- map display
- home price estimate by postal code
- price trend
- heatmap
- apartment/house/penthouse/office/shop categories

Modeling impact:
- Listing/search/analytics layer, not Property core
- valuation/estimate must be derived/provenance-tagged

### Divar / Sheypoor
Direct indexing of every live form is not consistently accessible to automated research.

Signals confirmed from surfaced/current and archived market examples:
- area
- room count
- floor
- build year
- parking
- storage
- elevator
- balcony
- price / rent terms
- land frontage / road width / deed in land listings
- marketplace subcategories separate residential from office/commercial/industrial-agricultural

Modeling impact:
- coverage checklist only
- do not copy listing form as canonical schema

### Iranian specialist listing examples
Industrial property examples show repeated operational attributes:
- land area
- hall/warehouse area
- office area
- clear height
- floor/roof/wall material
- 3-phase power + amperage
- industrial gas/water/phone
- truck access
- overhead crane

Land/garden examples show:
- deed type
- registered land use
- frontage
- road width
- utilities
- agricultural/garden use

## B. Short-stay platforms

### Otaghak
Current Google Play description supports:
Guest:
- instant booking
- accommodation categories
- last-minute offers
Host:
- accommodation management
- reservation request management
- pricing calendar
- financial transaction history
- guest info/chat
- wallet/financial management
- instant-booking windows

### Shab
Google Play listing and surfaced current material support:
- accommodation filters
- instant booking / last minute
- photos, rooms, area, local access
- required documents
- chat before payment
- daily/long-term booking
- host calendar with daily full/empty + price
- reservation/request/financial history
- guest info/chat
- property/personal document review as a trust signal

### Jabama
Current surfaced app description supports:
- dynamic pricing calendar
- real-time reservation status
- reservation history
Host:
- management dashboard
- instant booking
- market analytics
- settlement workflow

Current public stay examples additionally reinforce amenity-rich discovery.

### Jajiga
Google Play description supports:
Guest:
- map search / nearby
- capacity/type/rate/climate filters
- instant booking
- accessibility
- pet-friendly
- reviews
- host chat
Host:
- professional dashboard
- calendar/rate updates
- booking notifications
- booking/financial history
- hosting analytics
- discounts/instant/last-minute settings
- guest reviews
- ranking

Modeling impact:
- StayOffering, AvailabilityDay, RateRule, Reservation, HouseRule, review/host operations must remain outside Property core.

## C. Iranian apartment/building legal structure

Apartment ownership rules and implementing regulation support a distinction between:
- exclusive parts
- common parts
- dependent/accessory parts

Common examples include shared land, shared building systems, stairs, roof and facade.

Modeling impact:
- Space.access_scope
- Space.legal_relation
- common building systems not treated as privately owned unit fields
- parking/storage may need explicit documentary/legal relation

## D. Current lease workflow

Current lease-law text (with 1403 amendment) supports explicit:
- lease term
- rent
- deposit/loan amount
- electronic registration
- party confirmation
- witnesses
- tracking identifier workflow

Modeling impact:
- Lease
- LeaseParty
- witness role
- LeaseRegistrationRef
- signed artifact
- registration policy kept configurable

## E. Current official non-movable property registration direction

Recent law/regulation/technical requirements support modeling official data items and external registration workflows.

Current technical/legal material for uniform contracts explicitly references property data concepts including:
- area
- easement
- usufruct
- parking/storage count/area
- freehold/waqf status
- geographic location of main parcel
- parcel geometry

Modeling impact:
- RegistryIdentity
- PropertyRight
- Parcel/Geometry
- Space
- external official registration adapter

## F. International reference — RESO

RESO Data Dictionary currently models real-estate exchange data as:
- resources
- fields
- lookup values
- related resources
- media
- history

It also includes measurement-source concepts and typed data.

Modeling impact:
- resource/field/lookup discipline
- typed contracts
- provenance on measured data
- related Media/history collections

## G. Confidence labels

Use these labels in future research:
- **Direct-current:** official/current product page or current app-store description
- **Official/legal:** legislation/regulation/official technical instruction
- **Current-market-example:** current listing/example from a market site
- **Indirect/surfaced:** search-indexed or mirrored evidence; useful but not enough to claim exact live form behavior
- **Design inference:** our modeling choice based on multiple signals

No competitor field becomes canonical solely because one site exposes it.
